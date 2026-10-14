import { defineConfig } from "@playwright/test";
import { existsSync } from "node:fs";

// Optional local settings; never commit endpoint-test opt-in or credentials.
if (existsSync(".env.staging.local")) process.loadEnvFile(".env.staging.local");

export default defineConfig({
  testDir: "./tests",
  testMatch: "staging.spec.ts",
  outputDir: "qa/screenshots/production-readiness/staging-runner",
  workers: 1,
  retries: 0,
  reporter: "list",
  use: {
    viewport: { width: 1440, height: 1000 },
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
});
