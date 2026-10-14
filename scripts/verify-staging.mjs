import assert from "node:assert/strict";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";
import { pathToFileURL } from "node:url";

/** @param {import("@playwright/test").Page} page */
export async function verifyStaging(page) {
  const url = new URL(process.env.STAGING_URL || "http://invalid.local");
  assert.equal(url.protocol, "https:");
  assert.ok(
    /^(?:[a-z0-9-]+--)?ofertastudio-staging-20261009\.netlify\.app$/.test(url.hostname),
    "This test may only target the isolated OfertaStudio staging site, never the production domain.",
  );
  assert.equal(
    process.env.RUN_STAGING_FORM_TEST,
    "1",
    "Explicitly enable the one synthetic submission.",
  );
  const output = "qa/screenshots/privacy-readiness/staging";
  await mkdir(output, { recursive: true });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  const result = { url: url.href, viewports: [], routes: {}, assets: [], submission: null };
  try {
    for (const width of [375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
      const response = await page.goto(url.href, { waitUntil: "networkidle" });
      assert.equal(response.status(), 200);
      assert.equal(new URL(page.url()).hostname, url.hostname);
      await page.evaluate(() => document.fonts.ready);
      assert.match(await page.locator("h1").innerText(), /Dobry produkt\./);
      assert.match(await page.locator("h1").innerText(), /Jeszcze lepszy/);
      assert.equal(await page.locator(".site-header .wordmark").textContent(), "OfertaStudio.pl");
      assert.equal(await page.locator(".site-footer .wordmark").textContent(), "OfertaStudio.pl");
      assert.match(await page.locator('meta[name="robots"]').getAttribute("content"), /noindex/);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      assert.equal(await page.getByRole("slider").count(), 0);
      await page.screenshot({ path: `${output}/${width}-hero.png` });
      for (const selector of ["#roznica", ".watch-feature", "[data-showcase]", "#kontakt"]) {
        await page.locator(selector).scrollIntoViewIfNeeded();
        await page
          .locator(`${selector} img`)
          .evaluateAll((images) => Promise.all(images.map((image) => image.decode())));
        await page
          .locator(selector)
          .screenshot({ path: `${output}/${width}-${selector.replace(/[#.]/g, "")}.png` });
      }
      result.viewports.push({ width, status: 200, overflow: false });
    }
    for (let index = 0; index < 5; index++) {
      await page.locator(".studio-controls button").nth(index).click();
      await page.waitForFunction(
        (i) => document.querySelector(".studio-sticky").dataset.stage === String(i),
        index,
      );
      await page
        .locator('.studio-image[data-active="true"] img')
        .evaluate((image) => image.decode());
    }
    for (const name of [
      "Packshot White",
      "Packshot Premium",
      "Detal i retusz",
      "Kompleksowa prezentacja oferty",
    ]) {
      assert.ok((await page.locator("#mozliwosci").innerText()).includes(name));
    }
    assert.equal(await page.locator(".capability-preview").count(), 0);
    assert.equal(
      await page.getByRole("group", { name: "Wybierz kolekcję" }).getByRole("button").count(),
      3,
    );
    for (const [name, id] of [
      ["Obuwie", "sneaker"],
      ["Perfumy", "perfume"],
      ["Narzędzia", "power-tool"],
    ]) {
      await page.getByRole("button", { name, exact: true }).click();
      await page.waitForFunction(
        (collection) => document.querySelector("[data-showcase]").dataset.collection === collection,
        id,
      );
      assert.equal(await page.locator("[data-showcase-index]").textContent(), "01/ 08");
      assert.equal(await page.locator("[data-showcase-slide]").count(), 8);
    }
    await page.goto(new URL("/prywatnosc", url).href, { waitUntil: "networkidle" });
    assert.equal(await page.locator("h1").textContent(), "Polityka prywatności OfertaStudio.pl");
    assert.match(
      await page.locator("#administrator").innerText(),
      /Piotr Pozdrowicz, osoba fizyczna/,
    );
    assert.equal(
      await page.locator("#administrator a").getAttribute("href"),
      "mailto:pozdrowicz@gmail.com",
    );
    for (const route of [
      "/prywatnosc",
      "/robots.txt",
      "/sitemap.xml",
      "/__forms.html",
      "/opengraph-image",
      "/icon.svg",
    ]) {
      const response = await page.request.get(new URL(route, url).href);
      assert.equal(response.status(), 200, route);
      result.routes[route] = response.status();
      if (route === "/robots.txt") assert.match(await response.text(), /Disallow: \/\s/);
    }
    const files = await readdir("public/media", { recursive: true });
    for (const file of files.filter((name) => name.endsWith(".webp"))) {
      const response = await page.request.head(new URL(`/media/${file}`, url).href);
      assert.equal(response.status(), 200, file);
      result.assets.push(file);
    }
    assert.equal(result.assets.length, 40);
    await page.goto(new URL("/#kontakt", url).href, { waitUntil: "networkidle" });
    assert.equal(await page.getByText(/Test techniczny — wyłącznie dane testowe/).count(), 1);
    assert.match(
      await page.locator(".form-bottom").innerText(),
      /Administratorem Twoich danych osobowych jest Piotr Pozdrowicz/,
    );
    assert.equal(await page.locator(".form-bottom a").getAttribute("href"), "/prywatnosc");
    assert.equal(await page.locator('input[type="checkbox"]').count(), 0);
    await page.getByRole("button", { name: "Wyślij zapytanie" }).click();
    assert.equal(await page.getByText(/Wpisz poprawny adres e-mail/).count(), 1);
    await page.getByLabel(/Imię lub firma/).fill("TEST TECHNICZNY WALIDACJA");
    await page.getByLabel(/E-mail/).fill("invalid-email");
    await page.getByLabel(/Co chcesz pokazać/).fill("[TEST OFERTASTUDIO] Walidacja przed wysyłką.");
    await page.getByRole("button", { name: "Wyślij zapytanie" }).click();
    assert.equal(await page.getByLabel(/E-mail/).getAttribute("aria-invalid"), "true");
    const marker = `PRIVACY-RC-${new Date().toISOString()}`;
    result.submission = { marker, status: null, successUI: false, receiptVerifiedByApi: false };
    await writeFile(`${output}/verification.json`, JSON.stringify(result, null, 2));
    await page.getByLabel(/Imię lub firma/).fill(`TEST TECHNICZNY ${marker}`);
    await page.getByLabel(/E-mail/).fill("test@example.com");
    await page
      .getByLabel(/Co chcesz pokazać/)
      .fill(
        `[TEST OFERTASTUDIO] ${marker} — syntetyczna próba odbioru na stagingu. Bez danych klienta.`,
      );
    await page.getByLabel(/Link do produktu lub zdjęcia/).fill("https://example.com/product");
    const submitted = page.waitForResponse(
      (response) =>
        response.request().method() === "POST" && response.url().includes("/__forms.html"),
    );
    await page.getByRole("button", { name: "Wyślij zapytanie" }).click();
    const response = await submitted;
    await page.getByRole("heading", { name: "Zapis testowy przyjęty." }).waitFor();
    result.submission = {
      marker,
      status: response.status(),
      successUI: true,
      receiptVerifiedByApi: false,
    };
    await page.locator("#kontakt").screenshot({ path: `${output}/submission-success.png` });
    assert.deepEqual(errors, []);
    await writeFile(`${output}/verification.json`, JSON.stringify(result, null, 2));
    console.log(JSON.stringify(result, null, 2));
  } finally {
    await writeFile(
      `${output}/verification.json`,
      JSON.stringify({ ...result, browserErrors: errors }, null, 2),
    );
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const browser = await chromium.launch();
  try {
    await verifyStaging(await browser.newPage({ viewport: { width: 1440, height: 1000 } }));
  } finally {
    await browser.close();
  }
}
