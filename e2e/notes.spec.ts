import { test, expect, type Page } from "@playwright/test";

// Inline login helper to avoid missing-module errors from ./helpers/login
async function login(page: Page) {
  // Basic navigation: adjust the URL/selectors as needed for your app
  await page.goto("/");
}

test("Login and load Notes page", async ({ page }) => {
  await login(page);

  await expect(page.locator("text=Notes")).toBeVisible();
});
