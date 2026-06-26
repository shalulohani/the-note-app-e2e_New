import { test, expect } from "@playwright/test";

async function login(page) {
  await page.goto("/");
}

test("Search notes by keyword", async ({ page }) => {
  await login(page);

  await page.fill('input[placeholder=\"Enter note\"]', "React Notes");
  await page.click("button:has-text('Add Note')");

  await page.fill('input[type=\"search\"]', "React");

  await expect(page.locator("text=React Notes")).toBeVisible();
});
