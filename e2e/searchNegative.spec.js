import { test, expect } from "@playwright/test";

// Inline login helper to avoid missing-module errors when ./helpers/login.js is absent.
async function login(page) {
  // Navigate to app root; adjust URL if your app runs elsewhere.
  await page.goto(process.env.APP_URL || "http://localhost:3000");

  // If a login form exists, try to sign in using environment credentials.
  const emailInput = page.locator('input[name="email"]');
  if (await emailInput.count() > 0) {
    const user = process.env.TEST_USER_EMAIL || "test@example.com";
    const pass = process.env.TEST_USER_PASSWORD || "password";
    await emailInput.fill(user);
    const passInput = page.locator('input[name="password"]');
    if (await passInput.count() > 0) {
      await passInput.fill(pass);
    }
    const submit = page.locator('button[type="submit"]');
    if (await submit.count() > 0) await submit.click();
    // wait for navigation or app to be ready
    await page.waitForLoadState("networkidle").catch(() => {});
  }
}

test("Search for a non-existent keyword", async ({ page }) => {
  await login(page);

  await page.fill('input[type="search"]', "xyz123");

  await expect(page.locator("text=No results found")).toBeVisible();
});
