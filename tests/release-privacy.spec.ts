import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { screenshotRoot } from "./qa-paths";

const widths = [375, 390, 430, 768, 1024, 1280, 1440, 1920];

test("privacy identifies the controller, retains approval gate and is readable at eight widths", async ({
  page,
}) => {
  test.setTimeout(150_000);
  await mkdir(screenshotRoot, { recursive: true });
  for (const width of widths) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    const response = await page.goto("/prywatnosc", { waitUntil: "networkidle" });
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Polityka prywatności OfertaStudio.pl",
    );
    await expect(page.locator("#administrator")).toContainText("Piotr Pozdrowicz, osoba fizyczna");
    await expect(page.locator('#administrator a[href="mailto:pozdrowicz@gmail.com"]')).toHaveText(
      "pozdrowicz@gmail.com",
    );
    await expect(page.locator("main")).toContainText(
      "Wersja do zatwierdzenia przez administratora",
    );
    await expect(page.locator("main section")).toHaveCount(14);
    await expect(page.locator("main")).not.toContainText(
      "dane administratora nie zostały jeszcze zatwierdzone",
    );
    await expect(page.locator("main")).not.toContainText("[P-0");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://ofertastudio.pl/prywatnosc",
    );
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    for (const href of await page
      .locator(".legal-contents a")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")!))) {
      await expect(page.locator(href)).toHaveCount(1);
    }
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    await page.screenshot({ path: `${screenshotRoot}/${width}-privacy.png`, fullPage: true });
    await page.screenshot({ path: `${screenshotRoot}/${width}-privacy-top.png` });
    const toc = page.getByRole("navigation", { name: "Spis treści polityki prywatności" });
    await toc.getByRole("link", { name: "Twoje prawa", exact: true }).focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("#prawa-title")).toBeInViewport();
    await page.getByRole("link", { name: "Wróć do formularza" }).focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/#kontakt$/);
    await expect(page.locator("#contact-title")).toBeInViewport();
    const notice = page.locator(".form-bottom > p");
    await expect(notice).toContainText(
      "Administratorem Twoich danych osobowych jest Piotr Pozdrowicz.",
    );
    await expect(notice.getByRole("link", { name: "Polityce prywatności" })).toHaveAttribute(
      "href",
      "/prywatnosc",
    );
    await expect(page.locator('input[type="checkbox"], input[type="file"]')).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    await page
      .locator("#kontakt")
      .screenshot({ path: `${screenshotRoot}/${width}-privacy-contact.png` });
    await page
      .locator(".form-bottom")
      .screenshot({ path: `${screenshotRoot}/${width}-privacy-notice.png` });
    await page
      .locator("footer")
      .getByRole("link", { name: /Prywatność/ })
      .focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/prywatnosc$/);
  }
});

test("clean browser data flow stays first-party without persistent storage, including a mocked submission", async ({
  page,
  context,
  baseURL,
}) => {
  test.setTimeout(60_000);
  await mkdir(screenshotRoot, { recursive: true });
  const origin = new URL(baseURL!).origin;
  const requests: { method: string; path: string; origin: string; type: string }[] = [];
  const logs: string[] = [];
  const errors: string[] = [];
  const setCookies: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.protocol.startsWith("http"))
      requests.push({
        method: request.method(),
        path: url.pathname,
        origin: url.origin,
        type: request.resourceType(),
      });
  });
  page.on("console", (message) => logs.push(message.text()));
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.headers()["set-cookie"]) setCookies.push(new URL(response.url()).pathname);
  });
  const snapshots: object[] = [];
  async function snapshot(stage: string) {
    const cookies = await context.cookies();
    const storage = await page.evaluate(async () => ({
      local: Object.keys(localStorage),
      session: Object.keys(sessionStorage),
      indexedDB: (await indexedDB.databases()).map((db) => db.name),
      serviceWorkers: (await navigator.serviceWorker.getRegistrations()).map((reg) => reg.scope),
    }));
    snapshots.push({
      stage,
      cookies: cookies.map((cookie) => ({
        name: cookie.name,
        domain: cookie.domain,
        expires: cookie.expires,
      })),
      storage,
    });
    expect(cookies).toEqual([]);
    expect(storage).toEqual({ local: [], session: [], indexedDB: [], serviceWorkers: [] });
  }
  await page.goto("/", { waitUntil: "networkidle" });
  await snapshot("initial-homepage");
  await page
    .locator("footer")
    .getByRole("link", { name: /Prywatność/ })
    .click();
  await page.waitForLoadState("networkidle");
  await snapshot("privacy-navigation");
  await page.getByRole("link", { name: "Wróć do formularza" }).click();
  await page.getByLabel(/Imię lub firma/).fill("TEST TECHNICZNY PRIVACY");
  await page.getByLabel("E-mail", { exact: false }).fill("test@example.com");
  await page.getByLabel(/Co chcesz pokazać/).fill("[TEST OFERTASTUDIO] SYNTHETIC-PRIVACY-AUDIT");
  await page.getByLabel(/Link do produktu/).fill("https://example.com/product");
  await snapshot("form-filled-before-send");
  expect(requests.filter((r) => r.method === "POST")).toHaveLength(0);
  let posts = 0;
  await page.route("**/__forms.html", async (route) => {
    expect(route.request().method()).toBe("POST");
    const data = new URLSearchParams(route.request().postData()!);
    expect([...data.keys()].sort()).toEqual([
      "email",
      "form-name",
      "message",
      "name",
      "productLink",
      "website",
    ]);
    expect(data.get("form-name")).toBe("product-enquiry");
    expect(data.get("email")).toBe("test@example.com");
    expect(data.get("website")).toBe("");
    posts++;
    await route.fulfill({
      status: 200,
      contentType: "text/plain",
      body: "Mock acceptance, not a Netlify receipt",
    });
  });
  await page.getByRole("button", { name: "Wyślij zapytanie" }).click();
  await expect(page.getByRole("status")).toContainText("Zapis testowy przyjęty");
  await snapshot("after-mocked-acceptance");
  expect(posts).toBe(1);
  expect(requests.filter((r) => r.origin !== origin)).toEqual([]);
  expect(setCookies).toEqual([]);
  expect(errors).toEqual([]);
  expect(logs.join("\n")).not.toMatch(
    /test@example.com|SYNTHETIC-PRIVACY-AUDIT|TEST TECHNICZNY PRIVACY/,
  );
  await writeFile(
    `${screenshotRoot}/privacy-runtime.json`,
    JSON.stringify(
      {
        context: "fresh local production browser; form POST intercepted, no hosting/email receipt",
        snapshots,
        requests,
        setCookies,
        errors,
        logCount: logs.length,
      },
      null,
      2,
    ),
  );
});

test("form disclosure precedes submission, errors remain accessible and synthetic success restores focus", async ({
  page,
}) => {
  test.setTimeout(60_000);
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    // A hash-only goto preserves React state; start each viewport with a fresh document.
    await page.goto("about:blank");
    await page.goto("/#kontakt", { waitUntil: "networkidle" });
    let posts = 0;
    await page.route("**/__forms.html", async (route) => {
      posts++;
      await route.fulfill({
        status: posts === 1 ? 503 : 200,
        contentType: "text/plain",
        body: posts === 1 ? "Unavailable" : "Mock accepted",
      });
    });
    await page.getByRole("button", { name: "Wyślij zapytanie" }).click();
    await expect(page.getByLabel(/Imię lub firma/)).toBeFocused();
    await page.getByLabel(/Imię lub firma/).fill("TEST TECHNICZNY PRIVACY");
    await page.getByLabel(/E-mail/).fill("not-an-email");
    await page
      .getByLabel(/Co chcesz pokazać/)
      .fill("[TEST OFERTASTUDIO] Test interfejsu i informacji.");
    await page.getByRole("button", { name: "Wyślij zapytanie" }).click();
    await expect(page.getByLabel(/E-mail/)).toBeFocused();
    await expect(page.locator("#email-error")).toBeVisible();
    expect(posts).toBe(0);
    await page
      .locator(".contact-form-wrap")
      .screenshot({ path: `${screenshotRoot}/${width}-privacy-validation.png` });
    await page.getByLabel(/E-mail/).fill("test@example.com");
    await page.locator(".form-bottom a").focus();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "Wyślij zapytanie" })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#kontakt").getByRole("alert")).toContainText(
      "Nie udało się potwierdzić wysyłki",
    );
    await expect(page.getByLabel(/Co chcesz pokazać/)).not.toHaveValue("");
    await page
      .locator(".contact-form-wrap")
      .screenshot({ path: `${screenshotRoot}/${width}-privacy-error.png` });
    expect(
      (
        await new AxeBuilder({ page })
          .include("#kontakt")
          .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    await page.getByRole("button", { name: "Wyślij zapytanie" }).click();
    await expect(page.getByRole("status")).toBeFocused();
    await expect(page.getByRole("status")).toContainText(
      "Odbiór zapisu należy potwierdzić w panelu Netlify Forms",
    );
    await page
      .locator(".contact-form-wrap")
      .screenshot({ path: `${screenshotRoot}/${width}-privacy-success.png` });
    expect(posts).toBe(2);
    await page.unroute("**/__forms.html");
  }
});
