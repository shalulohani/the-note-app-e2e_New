import { test } from '@playwright/test';
import { LoginPage } from './helpers/pages/LoginPage.js';
import { NotesPage } from './helpers/pages/NotesPage.js';

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('test@example.com', 'password123');
});

test('User should be able to add a note', async ({ page }) => {
  const notes = new NotesPage(page);
  await notes.goto();
  await notes.addNote();
});

test('User should be able to edit the first note', async ({ page }) => {
  const notes = new NotesPage(page);
  await notes.goto();
  await notes.addNote('Original Note');
  await notes.editFirstNote();
});
