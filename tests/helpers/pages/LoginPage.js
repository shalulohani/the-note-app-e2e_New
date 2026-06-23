class LoginPage {
  constructor(page) {
    this.page = page; // ✅ store the page reference
    this.emailInput = page.locator('input[name="email"]'); // ✅ missing earlier
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
  }

  async goto() {
    // Ensure this matches your frontend port
    await this.page.goto('http://localhost:3000/login');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };
