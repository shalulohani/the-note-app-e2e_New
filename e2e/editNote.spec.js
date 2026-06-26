import { test, expect } from "@playwright/test";
import { login } from "../helpers/login";

test("Edit an existing note", async ({ page }) => {
  await login(page);

  await page.fill('input[placeholder="Enter note"]', "Original");
  await page.click("button:has-text('Add Note')");

  await page.click("button:has-text('Edit')");
  await page.fill('input[placeholder="Enter note"]', "Updated");
  await page.click("button:has-text('Save')");

  await expect(page.locator("text=Updated")).toBeVisible();
});
