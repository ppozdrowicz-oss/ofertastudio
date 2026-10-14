import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import { screenshotRoot } from "./qa-paths";
import { offerCollections } from "../src/content/showcase";

const ids = offerCollections[0].slides.map((slide) => slide.id);

async function ready(page: import("@playwright/test").Page) {
  await page.goto("/#perspektywy", { waitUntil: "networkidle" });
  const stage = page.getByRole("group", { name: /^Fotografie —/ });
  await stage.scrollIntoViewIfNeeded();
  return stage;
}

test("showcase controls, neighbors, keyboard, wraparound and rapid navigation keep captions aligned", async ({
  page,
}) => {
  const stage = await ready(page);
  const showcase = page.locator("[data-showcase]");
  await expect(showcase).toHaveAttribute("data-active-id", ids[0]);
  await expect(showcase.locator("img")).toHaveCount(3);
  await page.getByRole("button", { name: "Następne ujęcie", exact: true }).click();
  await expect(showcase).toHaveAttribute("data-active-id", ids[1]);
  await page.getByRole("button", { name: "Poprzednie ujęcie", exact: true }).click();
  await page.getByRole("button", { name: /Ujęcie po lewej:/ }).click();
  await expect(showcase).toHaveAttribute("data-active-id", ids[7]);
  await stage.focus();
  await page.keyboard.press("Home");
  await expect(showcase).toHaveAttribute("data-active-id", ids[0]);
  await page.keyboard.press("ArrowLeft");
  await expect(showcase).toHaveAttribute("data-active-id", ids[7]);
  await page.keyboard.press("ArrowRight");
  await expect(showcase).toHaveAttribute("data-active-id", ids[0]);
  for (let i = 0; i < 13; i++) await page.keyboard.press("ArrowRight");
  await expect(showcase).toHaveAttribute("data-active-id", ids[5]);
  await expect(stage).toBeFocused();
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Home");
    for (let j = 0; j < i; j++) await page.keyboard.press("ArrowRight");
    const slide = showcase.locator('[data-showcase-slide][data-active="true"]');
    await expect(slide).toHaveAttribute("data-showcase-slide", ids[i]);
    const expected = offerCollections[0].slides[i];
    await expect(slide.locator("img")).toHaveAttribute("alt", expected.image.alt);
    await expect(slide.locator("img")).toHaveAttribute(
      "src",
      new RegExp(expected.image.src.split("/").at(-1)!),
    );
    await expect(showcase.getByRole("heading", { level: 4 })).toHaveText(expected.title);
    await expect(showcase.getByRole("heading", { level: 4 })).toHaveCount(1);
    await expect(showcase.locator('[data-showcase-slide][data-visible="true"]')).toHaveCount(3);
  }
  await page.keyboard.press("Tab");
  await expect(stage).not.toBeFocused();
  expect(
    (
      await new AxeBuilder({ page })
        .include("[data-showcase]")
        .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});

test("mouse dragging survives release outside the card and cancellation", async ({ page }) => {
  const stage = await ready(page);
  const box = (await stage.boundingBox())!;
  await page.mouse.move(box.x + box.width * 0.55, box.y + box.height * 0.5);
  await page.mouse.down();
  await page.mouse.move(box.x + 8, box.y + box.height * 0.5, { steps: 10 });
  await page.mouse.up();
  await expect(page.locator("[data-showcase]")).toHaveAttribute("data-active-id", ids[1]);
  await expect(stage).not.toHaveAttribute("data-dragging");
  await stage.dispatchEvent("pointerdown", {
    pointerId: 25,
    clientX: 200,
    clientY: 200,
    isPrimary: true,
    button: 0,
  });
  await stage.dispatchEvent("pointercancel", { pointerId: 25 });
  await expect(stage).not.toHaveAttribute("data-dragging");
  await page.getByRole("button", { name: "Następne ujęcie", exact: true }).click();
  await expect(page.locator("[data-showcase]")).toHaveAttribute("data-active-id", ids[2]);
});

test("mobile touch swipes select photographs while vertical scrolling remains native", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    baseURL: test.info().project.use.baseURL,
  });
  const page = await context.newPage();
  const stage = await ready(page);
  const box = (await stage.boundingBox())!;
  const client = await context.newCDPSession(page);
  const y = box.y + box.height * 0.5;
  await client.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: 290, y }],
  });
  for (const x of [260, 230, 190, 150, 100])
    await client.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y }] });
  await client.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await expect(page.locator("[data-showcase]")).toHaveAttribute("data-active-id", ids[1]);
  const before = await page.evaluate(() => scrollY);
  await client.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: 190, y }],
  });
  for (const dy of [20, 55, 90, 140])
    await client.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: 190, y: y - dy }],
    });
  await client.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before + 20);
  await expect(page.locator("[data-showcase]")).toHaveAttribute("data-active-id", ids[1]);
  await context.close();
});

test("reduced motion has instantaneous transitions and keeps stable layout on resize", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const stage = await ready(page);
  await expect(page.locator('[data-showcase-slide][data-active="true"]')).toHaveCSS(
    "transition-duration",
    "0s",
  );
  await stage.focus();
  const heights = [];
  for (const key of ["Home", "ArrowRight", "End"]) {
    await page.keyboard.press(key);
    heights.push((await page.locator("[data-showcase]").boundingBox())!.height);
  }
  expect(Math.max(...heights) - Math.min(...heights)).toBeLessThan(1);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("[data-showcase]")).toHaveAttribute("data-active-id", ids[7]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
});

test("failed image is replaced by an honest usable fallback", async ({ page }) => {
  await page.route(/\/_next\/image\?.*sneaker.*01-main/, (route) =>
    route.fulfill({ status: 404, body: "Missing" }),
  );
  await ready(page);
  await expect(
    page.getByRole("img", { name: "Zdjęcie główne: zdjęcie niedostępne" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Następne ujęcie", exact: true }).click();
  await expect(page.locator("[data-showcase]")).toHaveAttribute("data-active-id", ids[1]);
});

test("all three complete offers preserve framing at eight viewport widths", async ({ page }) => {
  test.setTimeout(360_000);
  await mkdir(screenshotRoot, { recursive: true });
  for (const width of [375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    await ready(page);
    const sectionHeight = (await page.locator("[data-showcase]").boundingBox())!.height;
    // Capture height only: carousel geometry uses width, so the complete composition is unchanged.
    await page.setViewportSize({
      width,
      height: Math.max(width < 768 ? 844 : 1000, Math.ceil(sectionHeight) + 160),
    });
    for (const collection of offerCollections) {
      await page.getByRole("button", { name: collection.title, exact: true }).click();
      await expect(page.locator("[data-showcase]")).toHaveAttribute(
        "data-collection",
        collection.id,
      );
      const stage = page.getByRole("group", { name: /^Fotografie —/ });
      for (const [keys, name] of [
        [["Home"], "first"],
        [["Home", "ArrowRight", "ArrowRight", "ArrowRight"], "middle"],
        [["End"], "last"],
      ] as const) {
        await stage.focus();
        for (const key of keys) await page.keyboard.press(key);
        const selected = page.locator('[data-showcase-slide][data-active="true"]');
        await expect(selected).toHaveCSS("opacity", "1");
        await expect(selected.locator("img")).toHaveCSS("object-fit", "contain");
        await page
          .locator('[data-showcase-slide][data-visible="true"] img')
          .evaluateAll((images) =>
            Promise.all(images.map((image) => (image as HTMLImageElement).decode())),
          );
        await page.locator("[data-showcase]").evaluate(async (node) => {
          await Promise.all(
            node
              .getAnimations({ subtree: true })
              .map((animation) => animation.finished.catch(() => {})),
          );
          (document.activeElement as HTMLElement)?.blur();
        });
        await page.locator("[data-showcase]").screenshot({
          path: `${screenshotRoot}/${width}-${collection.id}-${name}.png`,
          animations: "disabled",
        });
        const active = (await selected.boundingBox())!;
        const frame = (await stage.boundingBox())!;
        expect(Math.abs(active.width - active.height)).toBeLessThan(1);
        expect(active.width / frame.width).toBeGreaterThan(width < 768 ? 0.8 : 0.54);
        expect(active.width / frame.width).toBeLessThan(
          width < 768 ? 0.84 : width < 1024 ? 0.75 : 0.65,
        );
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
          width,
        );
      }
    }
  }
});

test("collection selection resets to 01, maps all eight captions, retains focus and reserves height", async ({
  page,
}) => {
  test.setTimeout(90_000);
  await ready(page);
  const showcase = page.locator("[data-showcase]");
  const initialHeight = (await showcase.boundingBox())!.height;
  for (const collection of [...offerCollections].reverse()) {
    const button = page.getByRole("button", { name: collection.title, exact: true });
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(showcase).toHaveAttribute("data-collection", collection.id);
    await expect(showcase).toHaveAttribute("data-active-id", collection.slides[0].id);
    await expect(showcase.locator("[data-showcase-index]")).toHaveText("01/ 08");
    await expect(button).toBeFocused();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(showcase.locator("[data-showcase-slide]")).toHaveCount(8);
    expect(Math.abs((await showcase.boundingBox())!.height - initialHeight)).toBeLessThan(1);
    const stage = page.getByRole("group", { name: /^Fotografie —/ });
    await stage.focus();
    for (const slide of collection.slides) {
      const active = showcase.locator('[data-showcase-slide][data-active="true"]');
      await expect(active).toHaveAttribute("data-showcase-slide", slide.id);
      await expect(active.locator("img")).toHaveAttribute("alt", slide.image.alt);
      const source = await active.locator("img").getAttribute("src");
      expect(new URL(source!, "http://local.invalid").searchParams.get("url")).toBe(
        slide.image.src,
      );
      await active.locator("img").evaluate((image) => (image as HTMLImageElement).decode());
      await expect(showcase.getByRole("heading", { level: 4 })).toHaveText(slide.title);
      await expect(showcase.locator('[data-caption][data-active="true"]')).toContainText(
        slide.description,
      );
      const insights = showcase.locator('[data-insights][data-active="true"]');
      await expect(insights).toHaveCount(1);
      await expect(insights).toHaveAttribute("data-insights", slide.id);
      await expect(insights).toContainText(slide.insights.why);
      await expect(insights).toContainText(slide.insights.buyerValue);
      await expect(insights.locator("li")).toHaveText([...slide.insights.workshop]);
      await expect(insights.getByRole("heading")).toHaveCount(3);
      await page.keyboard.press("ArrowRight");
    }
    await page.keyboard.press("End");
  }
});

test("rapid collection selection cannot reveal stale images and loads only the requested offer", async ({
  page,
}) => {
  const requested: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("offer-carousel")) requested.push(request.url());
  });
  await ready(page);
  expect(requested.every((url) => !url.includes("perfume"))).toBe(true);
  const shoe = page.getByRole("button", { name: "Obuwie", exact: true });
  const perfume = page.getByRole("button", { name: "Perfumy", exact: true });
  for (let i = 0; i < 4; i++) {
    await perfume.click();
    await shoe.click();
  }
  await perfume.click();
  await expect(page.locator("[data-showcase]")).toHaveAttribute("data-collection", "perfume");
  await expect(page.locator("[data-showcase]")).toHaveAttribute(
    "data-active-id",
    "perfume-01-main",
  );
  await expect(page.locator("#offer-gallery")).toHaveAttribute("aria-busy", "false");
  expect(
    requested
      .filter((url) => url.includes("perfume"))
      .every((url) => /01-main|02-premium|08-packaging/.test(url)),
  ).toBe(true);
});

test("full image preview supports detail zoom, Escape, focus restoration and truthful information", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await ready(page);
  const stage = page.getByRole("group", { name: /^Fotografie —/ });
  await stage.focus();
  await page.keyboard.press("End");
  await page.keyboard.press("ArrowLeft");
  const opener = page.getByRole("button", { name: "Powiększ zdjęcie", exact: true });
  await opener.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading")).toHaveText("Rozmiary i dopasowanie");
  await expect(dialog.locator("img")).toHaveCSS("object-fit", "contain");
  await dialog.getByRole("button", { name: "Powiększ detale" }).click();
  expect((await dialog.locator("img").boundingBox())!.width).toBeGreaterThan(1000);
  for (let i = 0; i < 4; i++) {
    await page.keyboard.press("Tab");
    expect(await page.evaluate(() => !!document.activeElement?.closest("dialog"))).toBe(true);
  }
  await expect
    .poll(async () =>
      new URL(
        await dialog.locator("img").evaluate((image) => (image as HTMLImageElement).currentSrc),
        "http://local.invalid",
      ).searchParams.get("w"),
    )
    .toBe("3840");
  await dialog.locator("img").evaluate((image) => (image as HTMLImageElement).decode());
  await dialog.locator('[data-zoomed="true"]').evaluate((canvas) => {
    canvas.scrollTop = 780;
    canvas.scrollLeft = 0;
  });
  await dialog.screenshot({ path: `${screenshotRoot}/390-size-guide-zoom.png` });
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await page.getByRole("button", { name: "Perfumy", exact: true }).click();
  await expect(page.locator("[data-showcase]")).toHaveAttribute("data-collection", "perfume");
  await stage.focus();
  await page.keyboard.press("End");
  for (let i = 0; i < 3; i++) await page.keyboard.press("ArrowLeft");
  await expect(page.locator('[data-caption][data-active="true"]')).not.toContainText(
    "wymaga korekty",
  );
  await opener.click();
  await expect(dialog).not.toContainText("wymaga korekty");
  await expect(dialog.locator("img")).toHaveAttribute("alt", /wanilii Bourbon.*jaśmin.*benzoinowa/);
  expect(
    (
      await new AxeBuilder({ page })
        .include("dialog")
        .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.getByRole("button", { name: "Zamknij podgląd" }).click();
  await expect(opener).toBeFocused();
});

test("collection swap keeps the current images until all three incoming frames are ready", async ({
  page,
}) => {
  let release!: () => void;
  const held = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route(/\/_next\/image\?.*perfume.*08-packaging/, async (route) => {
    await held;
    await route.continue();
  });
  await ready(page);
  await page.getByRole("button", { name: "Perfumy", exact: true }).click();
  await expect(page.locator("#offer-gallery")).toHaveAttribute("aria-busy", "true");
  await expect(page.locator("[data-showcase]")).toHaveAttribute("data-collection", "sneaker");
  await expect(page.getByRole("button", { name: "Perfumy", exact: true })).toHaveAttribute(
    "data-pending",
    "true",
  );
  release();
  await expect(page.locator("[data-showcase]")).toHaveAttribute("data-collection", "perfume");
  await expect(page.locator("#offer-gallery")).toHaveAttribute("aria-busy", "false");
  expect(
    await page
      .locator('[data-showcase-slide][data-visible="true"] img')
      .evaluateAll((images) =>
        images.every(
          (image) =>
            (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0,
        ),
      ),
  ).toBe(true);
});
