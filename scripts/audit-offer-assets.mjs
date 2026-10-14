import { readFile, mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";
import sharp from "sharp";
import { offerCollections } from "../src/content/showcase.ts";

const assets = [];
for (const collection of offerCollections) {
  for (const slide of collection.slides) {
    const buffer = await readFile(`public${slide.image.src}`);
    const image = sharp(buffer, { failOn: "warning" });
    const metadata = await image.metadata();
    assert.equal(metadata.format, "webp");
    assert.equal(metadata.width, slide.image.width);
    assert.equal(metadata.height, slide.image.height);
    await image.raw().toBuffer(); // Full decode, not just a header/extension check.
    assets.push({
      collection: collection.id,
      id: slide.id,
      path: slide.image.src,
      format: metadata.format,
      width: metadata.width,
      height: metadata.height,
      aspectRatio: metadata.width / metadata.height,
      bytes: buffer.length,
      decoderColorSpace: metadata.space,
      embeddedIccBytes: metadata.icc?.length ?? 0,
      hasAlpha: metadata.hasAlpha,
      sha256: createHash("sha256").update(buffer).digest("hex"),
      reviewNote: slide.reviewNote ?? null,
    });
  }
}
const result = {
  status: "pass",
  count: assets.length,
  totalBytes: assets.reduce((sum, asset) => sum + asset.bytes, 0),
  assets,
};
await mkdir("qa/screenshots/offer-carousel", { recursive: true });
await writeFile(
  "qa/screenshots/offer-carousel/asset-validation.json",
  JSON.stringify(result, null, 2),
);
console.log(JSON.stringify(result, null, 2));
