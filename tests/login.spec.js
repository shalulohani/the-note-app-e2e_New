import { test, expect } from "@playwright/test";

test("UI Login - Valid Credentials", async ({ page }) => {
  // Open the React app
  await page.goto("http://localhost:3000");

  // Fill correct fields matching your frontend placeholders
  await page.fill('input[placeholder="Enter email"]', "admin");
  await page.fill('input[placeholder="Enter password"]', "admin");

  // Click login and wait for redirect
  await Promise.all([
    page.waitForURL("http://localhost:3000/notes"),
    page.click('button[type="submit"]')
  ]);

  // Verify Notes page loaded
  await expect(page.locator("h2")).toContainText("Notes");
});
