import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { screenshotRoot } from "./qa-paths";

const sizes = [
  [375, 812],
  [390, 844],
  [430, 932],
  [768, 1024],
  [1024, 900],
  [1280, 900],
  [1440, 1000],
  [1920, 1080],
];

for (const [width, height] of sizes) {
  test(`visual review and overflow at ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.setViewportSize({ width, height });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator(".site-header .wordmark")).toHaveText("OfertaStudio.pl");
    await expect(page.locator(".site-footer .wordmark")).toHaveText("OfertaStudio.pl");
    await expect(page.locator('img[src*="studies"]')).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width,
    );
    const broken = await page.locator("img").evaluateAll((images) =>
      images
        .filter((image): image is HTMLImageElement => image instanceof HTMLImageElement)
        .filter((image) => image.complete && !image.naturalWidth)
        .map((image) => image.src),
    );
    expect(broken).toEqual([]);
    await mkdir(screenshotRoot, { recursive: true });
    await page.screenshot({ path: `${screenshotRoot}/${width}-hero.png` });
    // Load lazy images and inspect each real section, including the sticky sequence.
    for (const selector of [
      "#roznica",
      ".studio-sticky",
      ".watch-feature",
      ...((await page.locator("[data-showcase]").count())
        ? ["[data-showcase]"]
        : [".editorial-pair", ".product-shelf"]),
      "#mozliwosci",
      "#proces",
      "#kontakt",
      ".site-footer",
    ]) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      await page
        .locator(`${selector} img`)
        .evaluateAll((images) =>
          Promise.all(images.map((image) => (image as HTMLImageElement).decode())),
        );
      await page.locator(selector).screenshot({
        path: `${screenshotRoot}/${width}-${selector.replace(/[#.\[\]]/g, "")}.png`,
      });
    }
    await page.screenshot({ path: `${screenshotRoot}/${width}-full.png`, fullPage: true });
    expect(errors).toEqual([]);
  });
}
