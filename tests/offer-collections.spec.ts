import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import { screenshotRoot } from "./qa-paths";

async function open(page: Page) {
  await page.goto("/#perspektywy", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  return page.locator("[data-showcase]");
}

async function choose(page: Page, name: string, id: string) {
  const button = page.getByRole("button", { name, exact: true });
  await button.click();
  await expect(page.locator("[data-showcase]")).toHaveAttribute("data-collection", id);
  await expect(page.locator("[data-showcase-index]")).toHaveText("01/ 08");
  await expect(button).toBeFocused();
}

async function photograph(page: Page, index: number, path: string) {
  const stage = page.getByRole("group", { name: /^Fotografie —/ });
  await stage.focus();
  await page.keyboard.press("Home");
  for (let i = 0; i < index; i++) await page.keyboard.press("ArrowRight");
  await page
    .locator('[data-showcase-slide][data-visible="true"] img')
    .evaluateAll((images) =>
      Promise.all(images.map((image) => (image as HTMLImageElement).decode())),
    );
  await page.locator("[data-showcase]").evaluate(async (node) => {
    await Promise.all(
      node.getAnimations({ subtree: true }).map((animation) => animation.finished.catch(() => {})),
    );
    (document.activeElement as HTMLElement)?.blur();
  });
  await page
    .locator("[data-showcase]")
    .screenshot({ path: `${screenshotRoot}/${path}.png`, animations: "disabled" });
}

test("three collection controls and new photographic states fit all eight viewports", async ({
  page,
}) => {
  test.setTimeout(240_000);
  await mkdir(screenshotRoot, { recursive: true });
  for (const width of [375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    const showcase = await open(page);
    const height = Math.ceil((await showcase.boundingBox())!.height) + 160;
    await page.setViewportSize({ width, height });
    const switcher = page.getByRole("group", { name: "Wybierz kolekcję" });
    await expect(switcher.getByRole("button")).toHaveCount(3);
    await switcher.screenshot({ path: `${screenshotRoot}/${width}-collection-switcher.png` });
    const buttons = await switcher.getByRole("button").all();
    let previousRight = 0;
    for (const button of buttons) {
      const box = (await button.boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(previousRight);
      expect(box.x + box.width).toBeLessThanOrEqual(width);
      expect(box.height).toBeGreaterThanOrEqual(44);
      previousRight = box.x + box.width;
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    await choose(page, "Narzędzia", "power-tool");
    await photograph(page, 1, `${width}-power-tool-second`);
    await photograph(page, 2, `${width}-power-tool-technical`);
    await choose(page, "Perfumy", "perfume");
    await photograph(page, 4, `${width}-perfume-information`);
    await expect(showcase.locator('[data-showcase-slide][data-active="true"] img')).toHaveAttribute(
      "src",
      /05-information/,
    );
    await expect(showcase.locator('[data-caption][data-active="true"]')).not.toContainText(
      "wymaga korekty",
    );
  }
});

test("three-way switching retains focus, resets counters and requests only nearby Milwaukee images", async ({
  page,
}) => {
  const requested: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("offer-carousel")) requested.push(request.url());
  });
  const showcase = await open(page);
  expect(requested.some((url) => /power-tool|perfume/.test(url))).toBe(false);
  const height = (await showcase.boundingBox())!.height;
  for (const [name, id, label] of [
    ["Narzędzia", "power-tool", "sneaker-to-milwaukee"],
    ["Perfumy", "perfume", "milwaukee-to-perfume"],
    ["Narzędzia", "power-tool", "perfume-to-milwaukee"],
  ]) {
    await choose(page, name, id);
    await expect(showcase.locator("[data-showcase-slide]")).toHaveCount(8);
    await expect(showcase.locator("img")).toHaveCount(3);
    expect(Math.abs((await showcase.boundingBox())!.height - height)).toBeLessThan(1);
    await photograph(page, 0, `switch-${label}`);
  }
  const toolRequests = requested.filter((url) => url.includes("power-tool"));
  expect(toolRequests.length).toBeGreaterThan(0);
  expect(toolRequests.every((url) => /01-main|02-dual-tools|08-premium-campaign/.test(url))).toBe(
    true,
  );
  const stage = page.getByRole("group", { name: /^Fotografie —/ });
  await stage.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(showcase).toHaveAttribute("data-active-id", "power-tool-08-premium-campaign");
  await page.keyboard.press("ArrowRight");
  await expect(showcase).toHaveAttribute("data-active-id", "power-tool-01-main");
  await page.getByRole("button", { name: "Następne ujęcie", exact: true }).click();
  await expect(showcase).toHaveAttribute("data-active-id", "power-tool-02-dual-tools");
  await page.getByRole("button", { name: /Ujęcie po prawej:/ }).click();
  await expect(showcase).toHaveAttribute("data-active-id", "power-tool-03-chuck-detail");
  await page.getByRole("button", { name: "Powiększ zdjęcie", exact: true }).click();
  await expect(page.getByRole("dialog").locator("img")).toHaveAttribute("src", /03-chuck-detail/);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Powiększ zdjęcie", exact: true })).toBeFocused();
  expect(
    (
      await new AxeBuilder({ page })
        .include("[data-showcase]")
        .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});

test("Milwaukee supports touch selection, swiping and reduced-motion lightbox", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: "reduce",
    baseURL: test.info().project.use.baseURL,
  });
  const page = await context.newPage();
  const showcase = await open(page);
  await page.getByRole("button", { name: "Narzędzia", exact: true }).tap();
  await expect(showcase).toHaveAttribute("data-collection", "power-tool");
  const stage = page.getByRole("group", { name: /^Fotografie —/ });
  await stage.scrollIntoViewIfNeeded();
  const box = (await stage.boundingBox())!;
  const y = box.y + box.height / 2;
  const cdp = await context.newCDPSession(page);
  await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 290, y }] });
  // Pace the native gesture: an unpaced CDP burst can suppress the next tap
  // in Chromium before any DOM click is dispatched.
  for (const x of [260, 230, 190, 150, 100]) {
    await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y }] });
    await page.waitForTimeout(80);
  }
  await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await expect(showcase).toHaveAttribute("data-active-id", "power-tool-02-dual-tools");
  await expect(showcase.locator('[data-showcase-slide][data-active="true"]')).toHaveCSS(
    "transition-duration",
    "0s",
  );
  await page.getByRole("button", { name: "Powiększ zdjęcie", exact: true }).tap();
  await expect(page.getByRole("dialog").locator("img")).toHaveCSS("object-fit", "contain");
  await page.getByRole("button", { name: "Zamknij podgląd" }).tap();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await context.close();
});

test("a missing incoming Milwaukee image does not stall switching or report a loaded photograph", async ({
  page,
}) => {
  await page.route(/\/_next\/image\?.*power-tool.*01-main/, (route) =>
    route.fulfill({ status: 404, body: "Missing" }),
  );
  await open(page);
  await choose(page, "Narzędzia", "power-tool");
  await expect(page.locator("#offer-gallery")).toHaveAttribute("aria-busy", "false");
  await expect(
    page.getByRole("img", { name: "Zdjęcie główne: zdjęcie niedostępne" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Następne ujęcie", exact: true }).click();
  await expect(page.locator("[data-showcase]")).toHaveAttribute(
    "data-active-id",
    "power-tool-02-dual-tools",
  );
});
