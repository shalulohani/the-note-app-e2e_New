import { test, expect } from '@playwright/test';

test('Delete a note', async ({ page }) => {
  // Step 1: Login
  await page.goto('http://localhost:3000/login');
  await page.fill('input[placeholder="Username"]', 'admin');
  await page.fill('input[placeholder="Password"]', 'admin123');
  await page.click('button:has-text("Login")');

  // Step 2: Wait for Notes page
  await page.waitForSelector('h1:has-text("Your Notes")');

  // Step 3: Add a temporary note
  const noteText = 'Temporary note for deletion';
  await page.fill('input[placeholder="Write a note"]', noteText);
  await page.click('button:has-text("Add")');

  // Step 4: Verify note appears
  const note = page.locator('li', { hasText: noteText });
  await expect(note).toBeVisible();

  // Step 5: Delete the note
  await note.locator('button:has-text("Delete")').click();

  // Step 6: Verify note is removed
  await expect(note).toHaveCount(0);
});
