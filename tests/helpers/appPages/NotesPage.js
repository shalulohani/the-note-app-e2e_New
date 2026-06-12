const { BasePage } = require('./BasePage');

class NotesPage extends BasePage {
  constructor(page) {
    super(page);
    this.addNoteButton = 'button:has-text("Add Note")';
    this.noteItems = 'li';
  }

  async addNote() {
    await this.click(this.addNoteButton);
  }

  async getNoteCount() {
    return await this.page.locator(this.noteItems).count();
  }
}

module.exports = { NotesPage };
