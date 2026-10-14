"""Read-only photographic audit. Outputs diagnostic images/JSON under ignored qa/.

Requires the audit environment's Pillow, NumPy, OpenCV and scikit-image.
Never writes to public/ and never estimates the provenance of an image.
"""
import hashlib
import json
from pathlib import Path

import cv2
import numpy as np
from PIL import Image
from skimage.metrics import structural_similarity

ROOT = Path("public/media")
OUTPUT = Path("qa/screenshots/final-audit")
OUTPUT.mkdir(parents=True, exist_ok=True)
CANVAS = 1300


def load(path):
    image = cv2.imread(str(ROOT / path), cv2.IMREAD_UNCHANGED)
    if image.shape[2] == 4:
        alpha = image[:, :, 3:4] / 255.0
        image = (image[:, :, :3] * alpha + 255 * (1 - alpha)).astype("uint8")
    return cv2.resize(image, (CANVAS, CANVAS), interpolation=cv2.INTER_AREA)


pairs = [
    ("sneaker", "before-after/sneaker-before.webp", "before-after/sneaker-after.webp"),
    ("perfume-source", "hero/perfume-source.webp", "hero/perfume-final.webp"),
    ("perfume-isolated", "hero/perfume-isolated.webp", "hero/perfume-final.webp"),
    ("perfume-retouched", "hero/perfume-retouched.webp", "hero/perfume-final.webp"),
    ("perfume-lit", "hero/perfume-lit.webp", "hero/perfume-final.webp"),
]
results = []
for name, first, second in pairs:
    a, b = load(first), load(second)
    detector = cv2.SIFT_create(nfeatures=5000)
    k1, d1 = detector.detectAndCompute(cv2.cvtColor(a, cv2.COLOR_BGR2GRAY), None)
    k2, d2 = detector.detectAndCompute(cv2.cvtColor(b, cv2.COLOR_BGR2GRAY), None)
    candidates = cv2.BFMatcher().knnMatch(d1, d2, k=2)
    good = [m for m, n in candidates if m.distance < 0.7 * n.distance]
    p1 = np.float32([k1[m.queryIdx].pt for m in good])
    p2 = np.float32([k2[m.trainIdx].pt for m in good])
    matrix, inliers = cv2.estimateAffinePartial2D(
        p1, p2, method=cv2.RANSAC, ransacReprojThreshold=4
    )
    if matrix is None:
        results.append({"pair": name, "status": "no stable similarity estimate"})
        continue
    residual = np.linalg.norm(cv2.transform(p1.reshape(1, -1, 2), matrix)[0] - p2, axis=1)
    center = np.array([CANVAS / 2, CANVAS / 2])
    offset = matrix[:, 2] + matrix[:, :2] @ center - center
    results.append({
        "pair": name, "analysis_canvas": CANVAS, "matches": len(good),
        "similarity_inliers": int(inliers.sum()),
        "scale": float(np.hypot(matrix[0, 0], matrix[1, 0])),
        "rotation_degrees": float(np.degrees(np.arctan2(matrix[1, 0], matrix[0, 0]))),
        "translation_px": matrix[:, 2].tolist(),
        "center_origin_offset_percent": (offset / CANVAS * 100).tolist(),
        "median_all_match_residual_px": float(np.median(residual)),
        "p90_all_match_residual_px": float(np.percentile(residual, 90)),
    })
    selected = [good[i] for i in range(len(good)) if inliers[i]][:60]
    cv2.imwrite(str(OUTPUT / f"{name}-feature-registration.jpg"), cv2.drawMatches(
        a, k1, b, k2, selected, None, flags=cv2.DrawMatchesFlags_NOT_DRAW_SINGLE_POINTS
    ))
    cv2.imwrite(str(OUTPUT / f"{name}-unregistered-overlay.jpg"), cv2.addWeighted(a, 0.5, b, 0.5, 0))
    if name == "perfume-source":
        aligned = cv2.warpAffine(a, matrix, (CANVAS, CANVAS), borderValue=(255, 255, 255))
        cv2.imwrite(str(OUTPUT / "perfume-source-registered-overlay.jpg"), cv2.addWeighted(aligned, 0.5, b, 0.5, 0))
    crops = [("heel", 0, 250, 500, 1000), ("laces", 420, 350, 970, 770), ("toe", 850, 500, 1300, 1050)] if name == "sneaker" else [("cap", 380, 120, 900, 600), ("base", 230, 850, 1100, 1250)]
    for label, x0, y0, x1, y1 in crops:
        cv2.imwrite(str(OUTPUT / f"{name}-{label}-pair.jpg"), np.concatenate([a[y0:y1, x0:x1], b[y0:y1, x0:x1]], axis=1))

frames, arrays = [], {}
for stage in ["source", "isolated", "retouched", "lit", "final"]:
    path = ROOT / f"hero/perfume-{stage}.webp"
    image = Image.open(path).convert("RGBA")
    arrays[stage] = np.array(image)
    frames.append({"stage": stage, "size": image.size, "sha256": hashlib.sha256(path.read_bytes()).hexdigest()})
differences = []
for first, second in [("isolated", "retouched"), ("retouched", "lit"), ("lit", "final"), ("retouched", "final")]:
    a, b = arrays[first], arrays[second]
    mask = (a[:, :, 3] > 220) & (b[:, :, 3] > 220)
    difference = np.abs(a[:, :, :3].astype(float) - b[:, :, :3].astype(float))
    differences.append({
        "pair": [first, second],
        "mean_absolute_rgb_difference_on_opaque_intersection": float(difference[mask].mean()),
        "percent_opaque_pixels_with_any_channel_difference_over_8": float((difference[mask].max(axis=1) > 8).mean() * 100),
        "ssim_rgb_800px": float(structural_similarity(np.array(Image.fromarray(a[:, :, :3]).resize((800, 800))), np.array(Image.fromarray(b[:, :, :3]).resize((800, 800))), channel_axis=2, data_range=255)),
    })
(OUTPUT / "registration-metrics.json").write_text(json.dumps(results, indent=2))
(OUTPUT / "asset-metrics.json").write_text(json.dumps({"frames": frames, "differences": differences}, indent=2))
print(json.dumps({"registration": results, "differences": differences}, indent=2))
