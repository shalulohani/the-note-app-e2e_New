import { test, expect } from '@playwright/test';

test('Search for a non-existent keyword', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.fill('input[placeholder="Username"]', 'admin');
  await page.fill('input[placeholder="Password"]', 'admin123');
  await page.click('button:has-text("Login")');

  await page.waitForSelector('h1:has-text("Your Notes")');

  // Add some sample notes
  await page.fill('input[placeholder="Write a note"]', 'React basics');
  await page.click('button:has-text("Add")');

  await page.fill('input[placeholder="Write a note"]', 'Playwright automation');
  await page.click('button:has-text("Add")');

  await page.fill('input[placeholder="Write a note"]', 'JavaScript fundamentals');
  await page.click('button:has-text("Add")');

  // Search for a keyword that does NOT exist
  await page.fill('input[placeholder="Search notes..."]', 'Python');

  // Expect ZERO results
  const notes = page.locator('li');
  await expect(notes).toHaveCount(0);
});
