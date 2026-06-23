import { test, expect } from "@playwright/test";

test("API - Edit Note", async ({ request }) => {
  // 1. Create a note first
  const create = await request.post("http://localhost:4000/notes", {
    data: { text: "Original Note" }
  });
  const createdNote = await create.json();

  // 2. Edit the created note
  const edit = await request.put(`http://localhost:4000/notes/${createdNote.id}`, {
    data: { text: "Updated Note" }
  });

  expect(edit.status()).toBe(200);
});
