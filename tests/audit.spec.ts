import { test, expect } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import AxeBuilder from "@axe-core/playwright";
import { screenshotRoot } from "./qa-paths";

test("registered studio canvas at tablet and intermediate desktop widths", async ({ page }) => {
  test.setTimeout(90_000);
  await mkdir(screenshotRoot, { recursive: true });
  for (const [width, height] of [
    [768, 1024],
    [1024, 900],
    [1280, 900],
    [1920, 1080],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    for (const stage of [0, 4]) {
      await page.locator(".studio-controls button").nth(stage).click();
      const frame = page.locator('.studio-image[data-active="true"]');
      await expect.poll(() => frame.evaluate((node) => getComputedStyle(node).opacity)).toBe("1");
      await expect(frame).toHaveAttribute("data-asset", stage === 0 ? "perfumeSource" : "perfume");
      const metrics = await frame.locator("img").evaluate(async (node) => {
        await (node as HTMLImageElement).decode();
        const style = getComputedStyle(node);
        return {
          width: parseFloat(style.width),
          height: parseFloat(style.height),
          filter: style.filter,
        };
      });
      expect(Math.abs(metrics.width - metrics.height)).toBeLessThan(1);
      expect(metrics.filter).toBe("none");
      await expect(frame).toHaveCSS("filter", "none");
      await page.locator(".studio-sticky").screenshot({
        path: `${screenshotRoot}/${width}-stage-button-${stage + 1}.png`,
      });
    }
  }
});

for (const width of [390, 1440]) {
  test(`photographic states, keyboard control and focus at ${width}px`, async ({ page }) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await mkdir(screenshotRoot, { recursive: true });
    const comparison = page.locator(".comparison");
    await comparison.scrollIntoViewIfNeeded();
    await expect(comparison.locator("figure")).toHaveCount(2);
    await expect(page.getByRole("slider")).toHaveCount(0);
    await comparison
      .locator("img")
      .evaluateAll((images) =>
        Promise.all(images.map((image) => (image as HTMLImageElement).decode())),
      );
    const boxes = await comparison.locator("figure").evaluateAll((frames) =>
      frames.map((frame) => {
        const { x, y, width, height } = frame.getBoundingClientRect();
        return { x, y, width, height };
      }),
    );
    if (width < 768) expect(boxes[1].y).toBeGreaterThanOrEqual(boxes[0].y + boxes[0].height);
    else expect(boxes[1].x).toBeGreaterThanOrEqual(boxes[0].x + boxes[0].width);
    await comparison.screenshot({ path: `${screenshotRoot}/${width}-comparison-frames.png` });

    const controls = page.locator(".studio-controls button");
    for (let index = 0; index < 5; index++) {
      const button = controls.nth(index);
      await button.focus();
      await page.keyboard.press("Enter");
      await expect(page.locator(".studio-sticky")).toHaveAttribute("data-stage", String(index));
      await expect(button).toBeFocused();
      await expect(button).toHaveAttribute("aria-pressed", "true");
      await expect
        .poll(() =>
          page
            .locator('.studio-image[data-active="true"]')
            .evaluate((node) => getComputedStyle(node).opacity),
        )
        .toBe("1");
      await page
        .locator('.studio-image[data-active="true"] img')
        .evaluate((image) => (image as HTMLImageElement).decode());
      await page
        .locator(".studio-sticky")
        .screenshot({ path: `${screenshotRoot}/${width}-stage-button-${index + 1}.png` });
    }
    for (const index of [0, 4, 1, 3, 2, 4]) await controls.nth(index).click();
    await expect(page.locator(".studio-sticky")).toHaveAttribute("data-stage", "4");
    await expect(page.locator('.studio-image[data-active="true"]')).toHaveCount(1);

    const services = page.locator("#mozliwosci");
    for (const name of [
      "Packshot White",
      "Packshot Premium",
      "Detal i retusz",
      "Kompleksowa prezentacja oferty",
    ])
      await expect(services).toContainText(name);
    await expect(services.locator("img,button,[aria-expanded]")).toHaveCount(0);
    await expect(page.locator(".capabilities")).toHaveCount(0);
    await services.screenshot({ path: `${screenshotRoot}/${width}-services.png` });
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    await writeFile(
      `${screenshotRoot}/${width}-accessibility.json`,
      JSON.stringify(
        {
          violations: audit.violations,
          incomplete: audit.incomplete.map(({ id, nodes }) => ({
            id,
            nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })),
          })),
        },
        null,
        2,
      ),
    );
    expect(audit.violations).toEqual([]);
  });
}
