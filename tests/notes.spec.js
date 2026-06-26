const { test, expect } = require("@playwright/test");

test("Login and load Notes page", async ({ page }) => {
  // 1. Login via API
  const response = await page.request.post("http://localhost:5000/login", {
    data: { username: "admin", password: "admin" } // ✅ Correct credentials
  });
  expect(response.status()).toBe(200);
  const userData = await response.json();

  // 2. Inject user data before page load
  await page.addInitScript((user) => {
    window.localStorage.setItem("user", JSON.stringify(user));
  }, userData);

  // 3. Open notes page
  await page.goto("http://localhost:3000/notes", { waitUntil: "networkidle" });

  // 4. Confirm heading
  await expect(page.locator("h2")).toHaveText("Notes");

  // 5. Wait for elements
  await page.waitForSelector('input[placeholder="Enter note"]', { state: "visible" });
  await page.waitForSelector('button:has-text("Add Note")', { state: "visible" });

  // 6. Add a note
  await page.fill('input[placeholder="Enter note"]', "Playwright test note");
  await page.click('button:has-text("Add Note")');

  // 7. Verify note appears
  const firstNote = page.locator("li").first();
  await firstNote.waitFor({ state: "visible" });
  await expect(firstNote).toBeVisible();
});
