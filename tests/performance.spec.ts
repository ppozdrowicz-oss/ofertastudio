import { test, expect } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { screenshotRoot } from "./qa-paths";

declare global {
  interface Window {
    __visualAudit: { lcp: number; cls: number; events: number[] };
  }
}

for (const mobile of [false, true]) {
  test(`production lab performance: ${mobile ? "mobile constrained" : "desktop local"}`, async ({
    browser,
  }) => {
    test.skip(
      test.info().project.name !== "production",
      "Lab measurements require next build + next start",
    );
    test.setTimeout(150_000);
    const runs = [];
    for (let run = 0; run < 3; run++) {
      const context = await browser.newContext({
        baseURL: test.info().project.use.baseURL,
        viewport: { width: mobile ? 390 : 1440, height: mobile ? 844 : 1000 },
        deviceScaleFactor: 1,
      });
      const page = await context.newPage();
      const cdp = await context.newCDPSession(page);
      await cdp.send("Network.enable");
      await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
      if (mobile) {
        await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
        await cdp.send("Network.emulateNetworkConditions", {
          offline: false,
          latency: 150,
          downloadThroughput: 1_600_000 / 8,
          uploadThroughput: 750_000 / 8,
          connectionType: "cellular4g",
        });
      }
      await page.addInitScript(() => {
        window.__visualAudit = { lcp: 0, cls: 0, events: [] };
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) window.__visualAudit.lcp = entry.startTime;
        }).observe({ type: "largest-contentful-paint", buffered: true });
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const shift = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
            if (!shift.hadRecentInput) window.__visualAudit.cls += shift.value;
          }
        }).observe({ type: "layout-shift", buffered: true });
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if ((entry as PerformanceEntry & { interactionId: number }).interactionId)
              window.__visualAudit.events.push(entry.duration);
          }
        }).observe({
          type: "event",
          buffered: true,
          durationThreshold: 16,
        } as PerformanceObserverInit);
      });
      const response = await page.goto("/", { waitUntil: "networkidle" });
      expect(response?.status()).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      await page
        .locator(".hero-product img")
        .evaluate((image) => (image as HTMLImageElement).decode());
      await page.waitForTimeout(500);
      const initial = await page.evaluate(() => ({
        ...window.__visualAudit,
        resources: (performance.getEntriesByType("resource") as PerformanceResourceTiming[]).map(
          (entry) => ({
            url: entry.name,
            kind: entry.initiatorType,
            transferBytes: entry.transferSize,
            encodedBytes: entry.encodedBodySize,
            durationMs: entry.duration,
          }),
        ),
        hero: {
          currentSrc: document.querySelector<HTMLImageElement>(".hero-product img")!.currentSrc,
          naturalWidth: document.querySelector<HTMLImageElement>(".hero-product img")!.naturalWidth,
        },
      }));
      for (const name of ["Narzędzia", "Perfumy", "Obuwie"]) {
        await page.getByRole("button", { name, exact: true }).click();
        await page.waitForTimeout(100);
      }
      runs.push({
        ...initial,
        ...(await page.evaluate(() => ({
          sampledInteractionEvents: window.__visualAudit.events.length,
          longestSampledEventMs: Math.max(0, ...window.__visualAudit.events),
          finalCls: window.__visualAudit.cls,
        }))),
      });
      await context.close();
    }
    await mkdir(screenshotRoot, { recursive: true });
    await writeFile(
      `${screenshotRoot}/performance-${mobile ? "mobile" : "desktop"}.json`,
      JSON.stringify(
        {
          deviceScaleFactor: 1,
          browserCache: "disabled",
          imageOptimizerCache: "shared local server; may be warm",
          cpuSlowdown: mobile ? 4 : 1,
          downloadMbps: mobile ? 1.6 : "unthrottled localhost",
          latencyMs: mobile ? 150 : "localhost",
          runs,
        },
        null,
        2,
      ),
    );
  });
}
