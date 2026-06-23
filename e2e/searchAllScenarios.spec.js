import { test, expect } from '@playwright/test';

test('Search feature - all scenarios', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.fill('input[placeholder="Username"]', 'admin');
  await page.fill('input[placeholder="Password"]', 'admin123');
  await page.click('button:has-text("Login")');

  await page.waitForSelector('h1:has-text("Your Notes")');

  // Add sample notes
  const notes = ['React basics', 'Playwright automation', 'JavaScript fundamentals'];
  for (const note of notes) {
    await page.fill('input[placeholder="Write a note"]', note);
    await page.click('button:has-text("Add")');
  }

  // 1️⃣ Positive scenario - existing keyword
  await page.fill('input[placeholder="Search notes..."]', 'Playwright');
  const filteredNotes = page.locator('li');
  await expect(filteredNotes).toHaveCount(1);
  await expect(filteredNotes).toContainText('Playwright automation');

  // 2️⃣ Negative scenario - non-existent keyword
  await page.fill('input[placeholder="Search notes..."]', 'Python');
  await expect(page.locator('li')).toHaveCount(0);

  // 3️⃣ Empty search restores all notes
  await page.fill('input[placeholder="Search notes..."]', '');
  await expect(page.locator('li')).toHaveCount(notes.length);

  // 4️⃣ Special characters
  await page.fill('input[placeholder="Search notes..."]', '@@@###');
  await expect(page.locator('li')).toHaveCount(0);

  // 5️⃣ Mixed case search
  await page.fill('input[placeholder="Search notes..."]', 'pLaYwRiGhT');
  await expect(page.locator('li')).toHaveCount(1);
  await expect(page.locator('li')).toContainText('Playwright automation');
});