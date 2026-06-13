export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('input[type="email"], input[name="email"], #email');
    this.passwordInput = page.locator('input[type="password"], input[name="password"], #password');
    this.loginButton = page.locator('button:has-text("Login")');
  }

  async gotoLogin() {
    await this.page.goto('https://pass-the-note-app.vercel.app/login');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async login(email, password) {
    await this.gotoLogin();

    // Wait for email field to appear
    await this.emailInput.waitFor({ state: 'visible', timeout: 15000 });

    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

    // Wait for navigation to Notes page
    await this.page.waitForURL('**/notes', { timeout: 15000 });
  }
}
