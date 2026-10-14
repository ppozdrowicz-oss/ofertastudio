import { defineConfig } from "@playwright/test";

const baseURL = process.env.E2E_BASE_URL || "http://127.0.0.1:3100";
export default defineConfig({
  testDir: "./tests",
  testIgnore: ["**/unit/**", "**/staging.spec.ts"],
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    viewport: { width: 1440, height: 1000 },
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    launchOptions: {
      ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
        ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE }
        : {}),
    },
  },
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: "npm run dev -- --port 3100 --hostname 127.0.0.1",
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 90_000,
        // All form requests in these tests are intercepted. No real enquiry is sent.
        env: {
          NETLIFY: "true",
          CONTACT_FORM_ENABLED: "true",
          CONTACT_FORM_TEST_MODE: "true",
          CONTEXT: "deploy-preview",
          NEXT_TELEMETRY_DISABLED: "1",
        },
      },
});
