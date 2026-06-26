const { test, expect } = require("@playwright/test");

test("Login and load Notes page", async ({ page }) => {

  // 1. Login API call
  const response = await page.request.post("http://localhost:5000/login", {
    data: { username: "admin", password: "admin123" }
  });
  expect(response.status()).toBe(200);
  const userData = await response.json();

  // 2. Set localStorage BEFORE page loads
  await page.addInitScript((user) => {
    window.localStorage.setItem("user", JSON.stringify(user));
  }, userData);

  // 3. Open notes page
  await page.goto("http://localhost:3000/notes", { waitUntil: "networkidle" });

  // 4. Confirm heading
  await expect(page.locator("h2")).toHaveText("Notes");

  // 5. Wait for Notes page to load
  await page.waitForSelector('input[placeholder="Enter note"]', { state: "visible", timeout: 10000 });
  await page.waitForSelector('button:has-text("Add Note")', { state: "visible", timeout: 10000 });

  // 6. Add a note to make list visible
  await page.fill('input[placeholder="Enter note"]', "Playwright test note");
  await page.click('button:has-text("Add Note")');

  // 7. Wait for first note to appear
  const firstNote = page.locator("li").first();
  await firstNote.waitFor({ state: "visible", timeout: 10000 });
  await expect(firstNote).toBeVisible();

});
