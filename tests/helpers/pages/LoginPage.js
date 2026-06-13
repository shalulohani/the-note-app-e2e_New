import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = this.page.getByPlaceholder('Enter email');
    this.passwordInput = this.page.getByPlaceholder('Enter password');
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
  }

  async goto() {
    await this.page.goto('http://localhost:3001/login');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}
