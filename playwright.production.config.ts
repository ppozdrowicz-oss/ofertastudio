import { defineConfig } from "@playwright/test";
import base from "./playwright.config";

export default defineConfig({
  ...base,
  projects: [{ name: "production" }],
  use: { ...base.use, baseURL: "http://127.0.0.1:3101" },
  webServer: {
    command: "npm run build && npm run start -- --port 3101 --hostname 127.0.0.1",
    url: "http://127.0.0.1:3101",
    reuseExistingServer: false,
    stdout: "pipe",
    timeout: 120_000,
    // Submission tests intercept every POST; this flag is only for the local test build.
    env: {
      NETLIFY: "true",
      CONTACT_FORM_ENABLED: "true",
      CONTACT_FORM_TEST_MODE: "true",
      CONTEXT: "deploy-preview",
      NEXT_TELEMETRY_DISABLED: "1",
    },
  },
});
