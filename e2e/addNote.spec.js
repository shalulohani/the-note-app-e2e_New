import { test, expect } from "@playwright/test";
import { login } from "../helpers/login.js";

test("Add a new note", async ({ page }) => {
  await login(page);

  await page.fill('input[placeholder="Enter note"]', "My new note");
  await page.click("button:has-text('Add Note')");

  await expect(page.locator("text=My new note")).toBeVisible();
});
