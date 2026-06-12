const { BasePage } = require('./BasePage');

class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
    this.nameInput = 'input[name="name"]';
    this.emailInput = 'input[name="email"]';
    this.passwordInput = 'input[name="password"]';
    this.registerButton = 'button[type="submit"]';
  }

  async register(name, email, password) {
    await this.fill(this.nameInput, name);
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    await this.click(this.registerButton);
  }
}

module.exports = { RegisterPage };
