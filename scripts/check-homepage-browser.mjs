// Optional QA dependency: provide externally installed Playwright and Chromium.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";

import { problems } from "../public/ofertastudio/problems.js";

const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE || "playwright"
);
const base = process.env.BASE_URL || "http://127.0.0.1:8124";
const server = process.env.BASE_URL
  ? null
  : spawn(
      process.execPath,
      [
        "node_modules/next/dist/bin/next",
        "start",
        "-H",
        "127.0.0.1",
        "-p",
        "8124",
      ],
      { stdio: "inherit" },
    );
const shots = process.env.QA_SCREENSHOTS || "node_modules/.qa/screenshots";
await mkdir(shots, { recursive: true });
let browser,
  passed = 0;
const record = (text) => {
  passed++;
  console.log("PASS: " + text);
};
try {
  for (let i = 0; i < 50; i++) {
    try {
      if ((await fetch(base, { signal: AbortSignal.timeout(1000) })).ok) break;
    } catch {
      /* waiting for local server */
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROMIUM_PATH
      ? { executablePath: process.env.CHROMIUM_PATH }
      : {}),
    args: JSON.parse(process.env.CHROMIUM_ARGS || "[]"),
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    permissions: ["clipboard-read", "clipboard-write"],
  });
  const page = await context.newPage(),
    errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error" && !m.text().includes("500"))
      errors.push(m.text());
  });
  await page.addInitScript(() => {
    window.qaEvents = [];
    document.addEventListener("ofertastudio:analytics", (e) =>
      window.qaEvents.push(e.detail),
    );
  });
  await page.goto(base);
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.locator(".problem-slide").count(), 10);
  assert.equal(await page.locator("h1").count(), 1);
  assert.equal(await page.locator("main").count(), 1);
  assert.equal(
    await page.locator("#contact-form").getAttribute("data-netlify"),
    "true",
  );
  assert.deepEqual(
    await page.evaluate(() =>
      [...document.querySelectorAll('a[href^="#"]')]
        .filter((a) => !document.getElementById(a.hash.slice(1)))
        .map((a) => a.hash),
    ),
    [],
  );
  record("static HTML, 10 slides, Netlify schema, anchors");
  const imagePage = await context.newPage();
  let releaseImages;
  const imageGate = new Promise((resolve) => {
    releaseImages = resolve;
  });
  await imagePage.route("**/problem-02-*.webp", async (route) => {
    await imageGate;
    await route.continue();
  });
  await imagePage.emulateMedia({ reducedMotion: "reduce" });
  await imagePage.goto(`${base}/#slabe-zdjecia`, {
    waitUntil: "domcontentloaded",
  });
  await imagePage.evaluate(() => document.fonts.ready);
  await imagePage.waitForFunction(() =>
    document.querySelector("#slabe-zdjecia").classList.contains("is-active"),
  );
  const imageBounds = () =>
    imagePage.locator("#slabe-zdjecia img").evaluateAll((images) =>
      images.map((img) => {
        const r = img.getBoundingClientRect();
        const parent = img.closest(".problem-slide").getBoundingClientRect();
        return [r.x - parent.x, r.y - parent.y, r.width, r.height];
      }),
    );
  const reservedBounds = await imageBounds();
  releaseImages();
  await imagePage.locator("#slabe-zdjecia img").evaluateAll(async (images) => {
    await Promise.all(images.map((img) => img.decode()));
  });
  assert.deepEqual(await imageBounds(), reservedBounds);
  await imagePage.locator("#slabe-zdjecia .slide-cta").click();
  assert.equal(new URL(imagePage.url()).hash, "#slabe-zdjecia");
  assert.equal(
    await imagePage.locator("#problem-detail").getAttribute("data-problem"),
    "slabe-zdjecia",
  );
  await imagePage.close();
  record(
    "slide 02: delayed images cause no layout shift; CTA and diagnosis hash",
  );
  for (const width of [320, 360, 390, 430, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.locator(".problem-track").focus();
    await page.keyboard.press("Home");
    const first = page.locator("#malo-klikniec");
    await first.scrollIntoViewIfNeeded();
    await first.locator("img").evaluateAll(async (images) => {
      await Promise.all(images.map((img) => img.decode()));
    });
    assert.equal(await first.locator(".slide-microdiagnosis").count(), 1);
    assert.equal(await first.locator("img").count(), 3);
    const imageState = await first.locator("img").evaluateAll((images) =>
      images.map((img) => ({
        loaded: img.complete && img.naturalWidth > 0,
        alt: img.alt,
        width: img.getBoundingClientRect().width,
        height: img.getBoundingClientRect().height,
        hidden: !!img.closest('[aria-hidden="true"]'),
      })),
    );
    assert(imageState.every((img) => img.loaded && img.alt && !img.hidden));
    assert(
      imageState[1].width * imageState[1].height >
        imageState[0].width * imageState[0].height * 2,
    );
    await first.screenshot({ path: `${shots}/problem-01-${width}.png` });
    for (let i = 0; i < 10; i++) {
      if (i) await page.keyboard.press("ArrowRight");
      if (i === 1) {
        const second = page.locator("#slabe-zdjecia");
        await second.scrollIntoViewIfNeeded();
        await second.locator("img").evaluateAll(async (images) => {
          await Promise.all(images.map((img) => img.decode()));
        });
        const photos = await second.locator("img").evaluateAll((images) =>
          images.map((img) => ({
            loaded: img.complete && img.naturalWidth > 0,
            src: img.getAttribute("src"),
            alt: img.alt,
            fit: getComputedStyle(img).objectFit,
            area: img.clientWidth * img.clientHeight,
            hidden: !!img.closest('[aria-hidden="true"]'),
          })),
        );
        assert.equal(photos.length, 3);
        assert(
          photos.every(
            (img) =>
              img.loaded && img.alt && !img.hidden && img.fit === "contain",
          ),
        );
        assert.deepEqual(
          photos.map((img) => img.src),
          ["main", "detail", "usage"].map(
            (role) => `/ofertastudio/assets/problem-02-${role}.webp`,
          ),
        );
        assert(photos[0].area > photos[1].area * 2);
        assert.equal(await second.locator(".slide-microdiagnosis").count(), 1);
        await second.screenshot({ path: `${shots}/problem-02-${width}.png` });
        await page.locator(".problem-track").focus();
      }
      const g = await page.evaluate(() => {
        const a = document.querySelector(".problem-slide.is-active"),
          t = document.querySelector(".problem-track"),
          r = a.getBoundingClientRect(),
          c = a.querySelector(".slide-cta").getBoundingClientRect();
        return {
          width: document.documentElement.scrollWidth,
          snap: Math.abs(r.left - t.getBoundingClientRect().left),
          overflow: a.scrollWidth - a.clientWidth,
          inside:
            c.right <= r.right && c.left >= r.left && c.bottom <= r.bottom,
          visual: [...a.querySelectorAll(".problem-visual *")].some(
            (n) => n.getBoundingClientRect().bottom > c.top + 1,
          ),
        };
      });
      assert(
        g.width <= width + 1 &&
          g.snap < 2 &&
          g.overflow < 2 &&
          g.inside &&
          !g.visual,
        `${width}px slide ${i}: ${JSON.stringify(g)}`,
      );
    }
    record(`${width}px: all 10 slides, snap, bounds, no overflow`);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${base}/#wejscia-bez-sprzedazy`);
  await page.waitForFunction(
    () =>
      document.querySelector("#problem-detail").dataset.problem ===
      "wejscia-bez-sprzedazy",
  );
  await page.locator(".next-problem").click();
  await page.waitForFunction(() => location.hash === "#brak-czasu");
  await page.goBack();
  await page.waitForFunction(
    () =>
      document.querySelector("#problem-detail").dataset.problem ===
      "wejscia-bez-sprzedazy",
  );
  await page.goForward();
  await page.waitForFunction(
    () =>
      document.querySelector("#problem-detail").dataset.problem ===
      "brak-czasu",
  );
  for (const p of problems) {
    await page.goto(`${base}/#${p.id}`);
    await page.waitForFunction(
      (id) => document.querySelector("#problem-detail").dataset.problem === id,
      p.id,
    );
    assert.equal(
      await page.locator(".explorer-progress").getAttribute("aria-valuenow"),
      String(Number(p.number)),
    );
  }
  record("all direct hashes, back / forward, progress");
  await page.goto(`${base}/#wejscia-bez-sprzedazy`);
  await page.locator("#wejscia-bez-sprzedazy .slide-cta").click();
  assert.equal(
    await page.locator("#problem-id").inputValue(),
    "wejscia-bez-sprzedazy",
  );
  assert.equal(
    await page.evaluate(() => document.activeElement.id),
    "diagnosis-title",
  );
  await page.locator("#problem-detail .button").click();
  assert(await page.locator("#chosen-problem").isVisible());
  assert(!(await page.locator("#problem-field").isVisible()));
  await page.locator('[data-package="FOTO"]').click();
  assert.equal(
    await page.locator("#problem-id").inputValue(),
    "wejscia-bez-sprzedazy",
  );
  await page.locator("#change-problem").click();
  assert.equal(
    await page.evaluate(() => document.activeElement.id),
    "problem-select",
  );
  await page
    .locator("#problem-select")
    .selectOption({ label: problems[5].title });
  await page.locator(".submit-button").click();
  assert(await page.locator("#message-error").textContent());
  await page
    .locator("#message")
    .fill("Test lokalny — bez wysyłki do odbiorcy.");
  await page.locator("#email").fill("qa@example.com");
  let payload,
    attempts = 0;
  await page.route("**/ofertastudio/index.html", async (route) => {
    if (route.request().method() !== "POST") return route.continue();
    payload = new URLSearchParams(route.request().postData());
    attempts++;
    await route.fulfill({
      status: attempts === 1 ? 500 : 200,
      body: "QA intercepted",
    });
  });
  await page.locator(".submit-button").click();
  await page.waitForFunction(
    () => document.querySelector("#form-error").textContent.length > 0,
  );
  assert.equal(await page.locator("#problem-id").inputValue(), "shoper");
  assert.equal(await page.locator("#email").inputValue(), "qa@example.com");
  await page.locator(".submit-button").click();
  await page.locator("#form-dialog").waitFor({ state: "visible" });
  assert.equal(payload.get("form-name"), "kontakt");
  assert.equal(payload.get("problem-id"), "shoper");
  assert.equal(payload.get("problem"), problems[5].title);
  assert.equal(payload.get("package"), "FOTO");
  assert.equal(await page.locator("#problem-id").inputValue(), "");
  await page.keyboard.press("Escape");
  await page.locator("#copy-checklist").click();
  await page.waitForFunction(
    () => document.querySelector("#copy-status").textContent.length > 0,
  );
  assert.match(await page.locator("#copy-status").textContent(), /skopiowana/);
  assert.match(
    await page.evaluate(() => navigator.clipboard.readText()),
    /Czy od razu wiadomo/,
  );
  const events = await page.evaluate(() => window.qaEvents);
  assert(
    events.some((e) => e.event === "form_submit" && e.problem_id === "shoper"),
  );
  assert(events.some((e) => e.event === "checklist_copy"));
  assert(!JSON.stringify(events).includes("@"));
  record(
    "selection, package, validation, failed / successful POST, clipboard, PII-free hooks",
  );
  await page.goto(`${base}/#malo-klikniec`);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.locator(".next-problem").click();
  await page.waitForTimeout(650);
  assert.equal(
    await page.locator("#problem-detail").getAttribute("data-problem"),
    "slabe-zdjecia",
  );
  const track = page.locator(".problem-track");
  await track.scrollIntoViewIfNeeded();
  const b = await track.boundingBox();
  await page.mouse.move(b.x + 800, b.y + 220);
  await page.mouse.down();
  await page.mouse.move(b.x + 130, b.y + 220, { steps: 14 });
  await page.mouse.up();
  await page.waitForTimeout(750);
  assert.equal(
    await page.locator("#problem-detail").getAttribute("data-problem"),
    "wejscia-bez-sprzedazy",
  );
  await track.focus();
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(600);
  await page.keyboard.press("Tab");
  assert.equal(
    await page.evaluate(() => document.activeElement.dataset.detail),
    "brak-czasu",
  );
  await page.keyboard.press("Shift+Tab");
  assert.equal(
    await page.evaluate(() => document.activeElement.className),
    "problem-track",
  );
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  assert.equal(
    await page.evaluate(() => document.activeElement.id),
    "diagnosis-title",
  );
  await page.locator(".previous-problem").focus();
  await page.keyboard.press("Space");
  await page.waitForTimeout(600);
  assert.equal(
    await page.locator("#problem-detail").getAttribute("data-problem"),
    "wejscia-bez-sprzedazy",
  );
  record("animated arrows, drag, Tab / Shift+Tab / arrows / Enter / Space");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".menu-toggle").click();
  assert(await page.locator("#mobile-nav").isVisible());
  await page.keyboard.press("Escape");
  assert(!(await page.locator("#mobile-nav").isVisible()));
  assert.equal(
    await page.evaluate(() => document.activeElement.className),
    "menu-toggle icon-button",
  );
  await page.locator(".menu-toggle").click();
  await page.locator('#mobile-nav a[href="#sklepy-shoper"]').click();
  assert(!(await page.locator("#mobile-nav").isVisible()));
  await page.locator("#przed-po").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  assert(
    await page
      .locator(".mobile-sticky")
      .evaluate((el) => el.classList.contains("visible")),
  );
  await page.locator("#contact-form").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  assert(
    !(await page
      .locator(".mobile-sticky")
      .evaluate((el) => el.classList.contains("visible"))),
  );
  await page.locator(".compare-range").fill("72");
  assert.match(
    await page.locator(".compare-range").getAttribute("aria-valuetext"),
    /72/,
  );
  await page.locator("#faq details").first().locator("summary").click();
  assert(
    (await page.locator("#faq details").first().getAttribute("open")) !== null,
  );
  record("mobile menu, Escape, sticky, comparison, FAQ");
  const mobile = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    }),
    tp = await mobile.newPage();
  await tp.goto(`${base}/#malo-klikniec`);
  await tp.locator(".problem-track").scrollIntoViewIfNeeded();
  const rect = await tp.locator(".problem-track").boundingBox(),
    y = Math.max(180, Math.min(500, rect.y + 220)),
    cdp = await mobile.newCDPSession(tp);
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: 340, y }],
  });
  for (let x = 320; x >= 60; x -= 20) {
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x, y }],
    });
    await tp.waitForTimeout(20);
  }
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await tp.waitForTimeout(800);
  assert.notEqual(
    await tp.locator("#problem-detail").getAttribute("data-problem"),
    "malo-klikniec",
  );
  assert(
    (await tp.evaluate(() =>
      Math.abs(
        document.querySelector(".is-active").getBoundingClientRect().left -
          document.querySelector(".problem-track").getBoundingClientRect().left,
      ),
    )) < 2,
  );
  record("native touch swipe and snap");
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(`${base}/#shoper`);
    await page.waitForFunction(
      () =>
        Math.abs(
          document.querySelector("#problemy").getBoundingClientRect().top - 110,
        ) < 50,
    );
    await page.screenshot({ path: `${shots}/explorer-${width}.png` });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base);
  await page.screenshot({ path: `${shots}/hero-1440.png` });
  const metrics = await page.evaluate(() => ({
    resources: performance.getEntriesByType("resource").length,
    transfer: performance
      .getEntriesByType("resource")
      .reduce((n, r) => n + r.transferSize, 0),
    dom: document.querySelectorAll("*").length,
  }));
  assert(
    metrics.dom < 1600 && metrics.transfer < 1600000,
    JSON.stringify(metrics),
  );
  record("basic payload budget " + JSON.stringify(metrics));
  const nojs = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    }),
    fallback = await nojs.newPage();
  await fallback.goto(base);
  assert.equal(await fallback.locator(".problem-slide").count(), 10);
  assert.equal(await fallback.locator("#problem-select option").count(), 11);
  assert.equal(
    await fallback.locator("#contact-form").getAttribute("method"),
    "POST",
  );
  assert(!(await fallback.locator(".explorer-controls").isVisible()));
  record("no-JavaScript content and form");
  await page.goto(`${base}/design-system`);
  assert.equal(await page.locator("main").count(), 1);
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  assert.deepEqual(errors, []);
  record("/design-system, no JS or unexpected console errors");
  console.log(`Completed ${passed} browser checks.`);
} finally {
  await browser?.close();
  server?.kill();
}
