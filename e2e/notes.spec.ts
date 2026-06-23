import { test, expect } from '@playwright/test';

test('Login and load Notes page', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  await page.fill('input[placeholder="Username"]', 'admin');
  await page.fill('input[placeholder="Password"]', 'admin123');

  await page.click('button:has-text("Login")');

  await page.waitForSelector('h1:has-text("Your Notes")', { timeout: 10000 });

  await expect(page.locator('h1')).toHaveText('Your Notes');
});
