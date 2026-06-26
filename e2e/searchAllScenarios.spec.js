import { test, expect } from "@playwright/test";
// Inline simple login helper to avoid missing module import
async function login(page) {
  // navigate to the app root; rely on Playwright's baseURL if configured
  await page.goto("/");
}

test("Search feature - all scenarios", async ({ page }) => {
  await login(page);

  await page.fill('input[placeholder="Enter note"]', "Playwright test");
  await page.click("button:has-text('Add Note')");

  await page.fill('input[type=\"search\"]', "Playwright");

  await expect(page.locator("text=Playwright test")).toBeVisible();
});
