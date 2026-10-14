import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import sharp from "sharp";
import { media } from "../../src/content/media";

test("the precision macro has genuine preserved alpha and keeps the original watch reference", async () => {
  assert.equal(media.watch.src, "/media/portfolio/watch/watch.webp");
  assert.equal(media.watchPrecision.src, "/media/portfolio/watch/watch-detail.webp");
  const buffer = readFileSync(`public${media.watchPrecision.src}`);
  assert.equal(
    createHash("sha256").update(buffer).digest("hex"),
    "811abd36d130034c6f763fe26a5f8dd754b19d380a82c453c7e16786c8fb3e34",
  );
  const metadata = await sharp(buffer).metadata();
  assert.equal(metadata.format, "webp");
  assert.equal(metadata.hasAlpha, true);
  assert.equal(metadata.width, media.watchPrecision.width);
  assert.equal(metadata.height, media.watchPrecision.height);
  const alpha = await sharp(buffer).ensureAlpha().extractChannel(3).raw().toBuffer();
  assert.ok(alpha.filter((value) => value === 0).length > alpha.length * 0.25);
  for (const corner of [0, 2999, 2999 * 3000, alpha.length - 1]) assert.equal(alpha[corner], 0);
  assert.ok(
    alpha[1500 * 3000 + 1500] >= 250,
    "Dial detail must not be cleared with the background",
  );
});
