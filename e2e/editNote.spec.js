import { test, expect } from '@playwright/test';

test('Edit an existing note', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.fill('input[placeholder="Username"]', 'admin');
  await page.fill('input[placeholder="Password"]', 'admin123');
  await page.click('button:has-text("Login")');

  await page.waitForSelector('h1:has-text("Your Notes")');

  // Add a note first
  const originalNote = 'Original note';
  await page.fill('input[placeholder="Write a note"]', originalNote);
  await page.click('button:has-text("Add")');
  await expect(page.locator('li')).toContainText(originalNote);

  // Click Edit
  await page.locator('li', { hasText: originalNote }).locator('button:has-text("Edit")').click();

  // Update note text
  const updatedNote = 'Updated note content';
  await page.fill('input[placeholder="Write a note"]', updatedNote);
  await page.click('button:has-text("Update")');

  // Verify updated note
  await expect(page.locator('li')).toContainText(updatedNote);
});
