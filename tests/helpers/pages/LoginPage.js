// tests/helpers/pages/LoginPage.js
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = 'input[name="email"]';
    this.passwordInput = 'input[name="password"]';
    this.loginButton = 'button[type="submit"]';
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(email, password) {
    await this.page.waitForSelector(this.emailInput, { state: 'visible', timeout: 60000 });
    await this.page.fill(this.emailInput, email);

    await this.page.waitForSelector(this.passwordInput, { state: 'visible', timeout: 60000 });
    await this.page.fill(this.passwordInput, password);

    await this.page.click(this.loginButton);
  }
}
