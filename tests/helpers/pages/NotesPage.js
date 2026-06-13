import { expect } from '@playwright/test';

export class NotesPage {
  constructor(page) {
    this.page = page;

    this.addNoteButton = page.getByRole('button', { name: 'Add Note' });
    this.editButtons = page.getByRole('button', { name: 'Edit' });

    this.titleInput = page.locator('input[placeholder="Enter note title"]');
    this.contentTextarea = page.locator('textarea[placeholder="Enter note content"]');
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async goto() {
    await this.page.goto('http://localhost:3001/notes');
  }

  async addNote(title = 'Test Note', content = 'Test Content') {
    await this.addNoteButton.click();
    await this.titleInput.fill(title);
    await this.contentTextarea.fill(content);
    await this.saveButton.click();
  }

  async editFirstNote(newTitle = 'Edited Note', newContent = 'Edited Content') {
    await this.editButtons.first().click();
    await this.titleInput.fill(newTitle);
    await this.contentTextarea.fill(newContent);
    await this.saveButton.click();

    await expect(this.page.locator(`h3:has-text("${newTitle}")`)).toBeVisible();
  }
}
