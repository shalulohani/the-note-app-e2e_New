export class NotesPage {
  constructor(page) {
    this.page = page;
    this.addNoteButton = page.locator('button:has-text("Add Note")');
    this.noteItems = page.locator('li');
  }

  async goto() {
    await this.page.goto('https://pass-the-note-app.vercel.app/notes');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async addNote() {
    await this.addNoteButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.addNoteButton.click();
  }

  async editFirstNote(newText = 'Edited content') {
    const firstNote = this.noteItems.first();

    // Wait for the first note to appear
    await firstNote.waitFor({ state: 'visible', timeout: 10000 });

    // Click to open the note
    await firstNote.click();

    // Locate editable field inside the note
    const textArea = firstNote.locator('textarea, input, p[contenteditable="true"]');

    await textArea.waitFor({ state: 'visible', timeout: 10000 });
    await textArea.fill(newText);
  }
}
