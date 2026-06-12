const { BasePage } = require('./BasePage');

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.goToNotesButton = 'button:has-text("Go to Notes")';
    this.logoutButton = 'button:has-text("Logout")';
  }

  async goToNotes() {
    await this.click(this.goToNotesButton);
  }

  async logout() {
    await this.click(this.logoutButton);
  }
}

module.exports = { DashboardPage };
