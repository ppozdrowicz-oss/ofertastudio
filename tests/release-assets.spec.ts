import { test, expect } from "@playwright/test";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";
import { optimizeImage } from "next/dist/server/image-optimizer/transform.js";
import { offerCollections } from "../src/content/showcase";
import { screenshotRoot } from "./qa-paths";

// Bind this review to the supplied files, not just their unchanged public URLs.
const reviewed = [
  {
    collection: 0,
    index: 7,
    name: "nike-packaging",
    sha: "9f879a842344fcd99d336f7cb0b0542b476191ec844639f38c432d9d17bfbffc",
    region: { left: 13, top: 101, width: 90, height: 40 },
  },
  {
    collection: 2,
    index: 5,
    name: "milwaukee-workshop",
    sha: "513cd647bf235f5822d8f57262f5b7b8af03cadfd5a76d49cf9524fb755ea2f0",
    region: { left: 83, top: 151, width: 18, height: 50 },
  },
];

for (const width of [390, 1440]) {
  test(`current replacement bytes, optimized detail and lightbox agree at ${width}px`, async ({
    page,
    request,
  }) => {
    test.setTimeout(120_000);
    await mkdir(screenshotRoot, { recursive: true });
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    await page.goto("/#perspektywy", { waitUntil: "networkidle" });
    const showcase = page.locator("[data-showcase]");
    const results = [];
    for (const item of reviewed) {
      const collection = offerCollections[item.collection];
      const slide = collection.slides[item.index];
      const source = await readFile(`public${slide.image.src}`);
      expect(createHash("sha256").update(source).digest("hex")).toBe(item.sha);
      const raw = await request.get(slide.image.src);
      expect(raw.status()).toBe(200);
      expect(
        createHash("sha256")
          .update(await raw.body())
          .digest("hex"),
      ).toBe(item.sha);
      await page.getByRole("button", { name: collection.title, exact: true }).click();
      await expect(showcase.locator("[data-showcase-index]")).toHaveText("01/ 08");
      await page.getByRole("group", { name: /^Fotografie —/ }).focus();
      for (let n = 0; n < item.index; n++) await page.keyboard.press("ArrowRight");
      await expect(showcase).toHaveAttribute("data-active-id", slide.id);
      const active = showcase.locator('[data-showcase-slide][data-active="true"] img');
      await active.evaluate((img) => (img as HTMLImageElement).decode());
      await expect(active).toHaveCSS("object-fit", "contain");
      await expect(showcase.locator('[data-insights][data-active="true"]')).toContainText(
        slide.insights.buyerValue,
      );
      if (item.collection === 2)
        await expect(showcase.locator('[data-caption][data-active="true"]')).not.toContainText(
          "wymaga korekty",
        );
      await showcase.screenshot({
        path: `${screenshotRoot}/${width}-release-${item.name}.png`,
        animations: "disabled",
      });
      await page.getByRole("button", { name: "Powiększ zdjęcie", exact: true }).click();
      const dialog = page.getByRole("dialog");
      const enlarged = dialog.locator("img");
      await enlarged.evaluate((img) => (img as HTMLImageElement).decode());
      await expect(enlarged).toHaveAttribute("alt", slide.image.alt);
      await dialog.screenshot({
        path: `${screenshotRoot}/${width}-release-${item.name}-lightbox.png`,
      });
      for (const [name, image] of [
        ["carousel", active],
        ["lightbox", enlarged],
      ] as const) {
        const url = await image.evaluate((img) => (img as HTMLImageElement).currentSrc);
        const response = await request.get(url, {
          headers: { Accept: "image/avif,image/webp,image/*,*/*;q=0.8" },
        });
        expect(response.ok()).toBe(true);
        // Independently encode the current file with the installed Next encoder,
        // bypassing its HTTP/cache path. Next maps q=90 to AVIF q=56, so comparing
        // with an unencoded source incorrectly treats expected chroma loss as stale.
        // This is a source/cache identity check, not a photographic quality score.
        const params = new URL(url).searchParams;
        const fresh = await optimizeImage({
          buffer: source,
          width: Number(params.get("w")),
          quality: Number(params.get("q")),
          contentType: response.headers()["content-type"].split(";")[0],
        });
        const delivered = await response.body();
        expect(createHash("sha256").update(delivered).digest("hex")).toBe(
          createHash("sha256").update(fresh).digest("hex"),
        );
        const normalize = (data: Buffer) =>
          sharp(data).resize(260, 260).removeAlpha().raw().toBuffer();
        const expected = await normalize(fresh);
        const actual = await normalize(delivered);
        const { left, top, width: w, height: h } = item.region;
        let error = 0;
        for (let y = top; y < top + h; y++)
          for (let x = left; x < left + w; x++)
            for (let c = 0; c < 3; c++) {
              const offset = (y * 260 + x) * 3 + c;
              error += Math.abs(expected[offset] - actual[offset]);
            }
        const meanAbsoluteError = error / (w * h * 3);
        expect(meanAbsoluteError, `${item.name} ${name}: stale or degraded detail`).toBe(0);
        results.push({ name: item.name, view: name, sha: item.sha, url, meanAbsoluteError });
      }
      await page.getByRole("button", { name: "Powiększ detale", exact: true }).click();
      await enlarged.evaluate((img) => (img as HTMLImageElement).decode());
      await expect(page.getByRole("group", { name: /Powiększone zdjęcie/ })).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(
        page.getByRole("button", { name: "Powiększ zdjęcie", exact: true }),
      ).toBeFocused();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    }
    await writeFile(
      `${screenshotRoot}/${width}-release-image-delivery.json`,
      JSON.stringify(results, null, 2),
    );
  });
}
