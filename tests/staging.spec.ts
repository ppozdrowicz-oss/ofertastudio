import { test } from "@playwright/test";
import { verifyStaging } from "../scripts/verify-staging.mjs";

test("isolated Netlify deployment and real synthetic form submission", async ({ page }) => {
  test.setTimeout(300_000);
  await verifyStaging(page);
});
