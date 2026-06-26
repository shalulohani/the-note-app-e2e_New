import { test, expect } from "@playwright/test";
import { login } from "../helpers/login.js";

test("Delete a note", async ({ page }) => {
  await login(page);

  await page.fill('input[placeholder="Enter note"]', "Delete me");
  await page.click("button:has-text('Add Note')");

  await page.click("button:has-text('Delete')");

  await expect(page.locator("text=Delete me")).not.toBeVisible();
});
