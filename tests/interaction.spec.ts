import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import { screenshotRoot } from "./qa-paths";

test("page has valid landmarks, working internal destinations and no browser errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(page).toHaveTitle(/OfertaStudio/);
  await expect(page.locator("h1")).toHaveCount(1);
  for (const href of await page
    .locator('a[href^="#"],a[href^="/#"]')
    .evaluateAll((links) => links.map((link) => link.getAttribute("href")!))) {
    await expect(page.locator(href.substring(href.indexOf("#")))).toHaveCount(1);
  }
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://ofertastudio.pl",
  );
  expect(errors).toEqual([]);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});

test("independent sneaker frames preserve honest labels and have no drag overlay", async ({
  page,
}) => {
  await page.goto("/#roznica");
  await expect(page.locator("#difference-title")).toContainText("Dwa ujęcia.");
  await expect(page.locator("#comparison-help")).toContainText(
    "Nie stanowią pary przed i po retuszu",
  );
  await expect(page.locator(".comparison figure")).toHaveCount(2);
  await expect(page.getByRole("slider")).toHaveCount(0);
  const image = page.locator(".comparison img").first();
  await expect(image).toHaveCSS("object-fit", "contain");
  await expect(image).toHaveCSS("transform", "none");
  await page.locator(".hero-scroll").focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#roznica$/);
});

test("mobile menu traps focus, closes with Escape and navigates to content", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Otwórz menu" });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.locator(".wordmark")).toHaveText("OfertaStudio.pl");
  for (let i = 0; i < 9; i++) {
    await page.keyboard.press("Tab");
    expect(await page.evaluate(() => !!document.activeElement?.closest("dialog"))).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole("link", { name: /Pokaż nam swój produkt/ }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page).toHaveURL(/#kontakt$/);
  await expect(page.locator("#contact-title")).toBeInViewport();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});

test("touch scrolling passes naturally through both independent sneaker frames", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  await page.goto("/");
  await page.locator(".comparison-frame").first().scrollIntoViewIfNeeded();
  const initialScroll = await page.evaluate(() => scrollY);
  const cdp = await context.newCDPSession(page);
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: 160, y: 600 }],
  });
  for (let step = 1; step <= 6; step++)
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: 160, y: 600 - step * 45 }],
    });
  await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(initialScroll + 30);
  await context.close();
});

test("reduced motion offers a nonsticky, operable product sequence", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page.locator(".studio-sticky").evaluate((node) => getComputedStyle(node).position),
  ).toBe("relative");
  await page.getByRole("button", { name: /Źródło/ }).click();
  await expect(page.getByRole("button", { name: /Źródło/ })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.getByText("Zaczynamy od Twojego produktu.")).toBeVisible();
});

test("native scrolling reveals all five studio stages and mobile keeps explicit control", async ({
  page,
}) => {
  await page.goto("/");
  await mkdir(screenshotRoot, { recursive: true });
  const stage = page.locator(".studio-sticky");
  for (let index = 0; index < 5; index++) {
    await page.locator(".studio-sequence").evaluate((section, value) => {
      const top = section.getBoundingClientRect().top + scrollY;
      const travel = section.getBoundingClientRect().height - innerHeight;
      window.scrollTo({ top: top + travel * ((value + 0.25) / 5), behavior: "instant" });
    }, index);
    await expect(stage).toHaveAttribute("data-stage", String(index));
    await expect
      .poll(() =>
        page
          .locator('.studio-image[data-active="true"]')
          .evaluate((node) => getComputedStyle(node).opacity),
      )
      .toBe("1");
    await stage.screenshot({ path: `${screenshotRoot}/1440-studio-stage-${index + 1}.png` });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: /02 Izolacja/ }).scrollIntoViewIfNeeded();
  const before = await page.evaluate(() => scrollY);
  await page.getByRole("button", { name: /02 Izolacja/ }).click();
  await expect(stage).toHaveAttribute("data-stage", "1");
  expect(Math.abs((await page.evaluate(() => scrollY)) - before)).toBeLessThan(3);
  await expect
    .poll(() =>
      page
        .locator('.studio-image[data-active="true"]')
        .evaluate((node) => getComputedStyle(node).opacity),
    )
    .toBe("1");
  await stage.screenshot({ path: `${screenshotRoot}/390-studio-stage-isolation.png` });
});

test("form exposes validation, pending, failure, retry and confirmed success", async ({ page }) => {
  await page.goto("/#kontakt");
  await page.getByRole("button", { name: "Wyślij zapytanie" }).click();
  await expect(page.getByLabel(/Imię lub firma/)).toBeFocused();
  await expect(page.getByText(/Wpisz poprawny adres e-mail/)).toBeVisible();
  await page.getByLabel(/Imię lub firma/).fill("TEST TECHNICZNY E2E");
  await page.getByLabel(/E-mail/).fill("test@example.com");
  await page
    .getByLabel(/Co chcesz pokazać/)
    .fill("[TEST OFERTASTUDIO] Test formularza bez rzeczywistego zapytania.");
  await page.route("**/__forms.html", (route) =>
    route.fulfill({ status: 503, body: "unavailable" }),
  );
  await page.getByRole("button", { name: "Wyślij zapytanie" }).click();
  await expect(
    page.getByRole("form", { name: "Pokaż nam swój produkt" }).getByRole("alert"),
  ).toContainText("Nie udało się potwierdzić wysyłki");
  await expect(page.getByLabel(/E-mail/)).toHaveValue("test@example.com");
  await page.unroute("**/__forms.html");
  await page.route("**/__forms.html", async (route) => {
    expect(route.request().postData()).toContain("form-name=product-enquiry");
    await new Promise((resolve) => setTimeout(resolve, 350));
    await route.fulfill({ status: 200, body: "accepted" });
  });
  await page.getByRole("button", { name: "Wyślij zapytanie" }).click();
  await expect(page.getByRole("button", { name: "Wysyłamy…" })).toBeDisabled();
  await expect(page.getByRole("status")).toContainText("Zapis testowy przyjęty");
});
