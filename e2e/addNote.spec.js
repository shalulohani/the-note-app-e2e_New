import { test, expect } from '@playwright/test';

test('Add a new note', async ({ page }) => {
  // Step 1: Login
  await page.goto('http://localhost:3000/login');
  await page.fill('input[placeholder="Username"]', 'admin');
  await page.fill('input[placeholder="Password"]', 'admin123');
  await page.click('button:has-text("Login")');

  // Step 2: Wait for Notes page
  await page.waitForSelector('h1:has-text("Your Notes")');

  // Step 3: Add a note
  const noteText = 'Playwright automation setup';
  await page.fill('input[placeholder="Write a note"]', noteText);
  await page.click('button:has-text("Add")');

  // Step 4: Verify note appears
  await expect(page.locator('li')).toContainText(noteText);
});
