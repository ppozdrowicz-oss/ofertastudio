import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import sharp from "sharp";
import { screenshotRoot } from "./qa-paths";
import { offerCollections } from "../src/content/showcase";

test("precision macro, expert panels and concise services fit all eight compositions", async ({
  page,
  request,
}) => {
  test.setTimeout(240_000);
  await mkdir(screenshotRoot, { recursive: true });
  for (const width of [375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    await page.goto("/", { waitUntil: "networkidle" });
    const watch = page.locator(".watch-feature");
    await watch.scrollIntoViewIfNeeded();
    const photo = watch.locator("img");
    await photo.evaluate((image) => (image as HTMLImageElement).decode());
    await expect(photo).toHaveAttribute("src", /watch-detail/);
    await expect(photo).toHaveAttribute("loading", "lazy");
    await expect(photo).toHaveCSS("object-fit", "contain");
    await expect(photo).toHaveCSS("filter", "none");
    await expect(photo).toHaveCSS("mix-blend-mode", "normal");
    await expect(watch.locator(".watch-image")).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await expect(watch).toHaveCSS("background-color", "rgb(38, 44, 35)");
    await expect(watch.locator("h3")).toHaveText("Detal,który robicałość.");
    await expect(watch.locator("h3 em")).toHaveText("całość.");
    const bounds = (await photo.boundingBox())!;
    const frame = (await watch.boundingBox())!;
    expect(bounds.x).toBeGreaterThanOrEqual(frame.x);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(frame.x + frame.width + 1);
    const watchCaption = (await watch.locator("figcaption").boundingBox())!;
    expect(bounds.y + bounds.height).toBeLessThan(watchCaption.y);
    const optimized = await request.get(
      await photo.evaluate((img) => (img as HTMLImageElement).currentSrc),
      { headers: { Accept: "image/avif,image/webp,image/*,*/*;q=0.8" } },
    );
    expect(optimized.ok()).toBe(true);
    expect((await sharp(await optimized.body()).metadata()).hasAlpha).toBe(true);
    await watch.screenshot({ path: `${screenshotRoot}/${width}-precision-macro.png` });
    await photo.screenshot({ path: `${screenshotRoot}/${width}-precision-dial.png` });
    await expect(page.locator(".capabilities, #capabilities-title")).toHaveCount(0);
    await expect(page.locator("#mozliwosci")).toContainText("Kompleksowa prezentacja oferty");
    await expect(page.locator("#oferta")).toBeAttached();
    const showcase = page.locator("[data-showcase]");
    await page.setViewportSize({
      width,
      height: Math.ceil((await showcase.boundingBox())!.height) + 160,
    });
    for (const [collection, index, name] of [
      ["Obuwie", 2, "nike-macro"],
      ["Obuwie", 6, "nike-size-guide"],
      ["Perfumy", 1, "perfume-premium"],
    ] as const) {
      await page.getByRole("button", { name: collection, exact: true }).click();
      const selected = offerCollections.find((entry) => entry.title === collection)!;
      // Collection switching waits for image decoding. Do not send navigation
      // to the previous collection while its replacement is still loading.
      await expect(showcase).toHaveAttribute("data-collection", selected.id);
      const stage = page.getByRole("group", { name: /^Fotografie —/ });
      await stage.focus();
      await page.keyboard.press("Home");
      for (let n = 0; n < index; n++) await page.keyboard.press("ArrowRight");
      await expect(showcase).toHaveAttribute("data-active-id", selected.slides[index].id);
      await showcase
        .locator('[data-showcase-slide][data-visible="true"] img')
        .evaluateAll((images) => Promise.all(images.map((i) => (i as HTMLImageElement).decode())));
      await showcase.evaluate(async (node) => {
        await Promise.all(
          node.getAnimations({ subtree: true }).map((a) => a.finished.catch(() => {})),
        );
        (document.activeElement as HTMLElement)?.blur();
      });
      await showcase.screenshot({
        path: `${screenshotRoot}/${width}-${name}-insights.png`,
        animations: "disabled",
      });
      const insights = showcase.locator('[data-insights][data-active="true"]');
      await expect(insights.getByRole("heading", { name: "Dlaczego właśnie tak?" })).toBeVisible();
      const caption = (await showcase.locator('[data-caption][data-active="true"]').boundingBox())!;
      const expert = (await insights.boundingBox())!;
      expect(Math.abs(caption.x - expert.x)).toBeLessThan(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    }
  }
});
