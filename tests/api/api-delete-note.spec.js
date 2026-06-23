import { test, expect } from "@playwright/test";

test("API - Delete Note", async ({ request }) => {
  // 1. Create a note first
  const create = await request.post("http://localhost:4000/notes", {
    data: { text: "Note to delete" }
  });
  const createdNote = await create.json();

  // 2. Delete the created note
  const del = await request.delete(`http://localhost:4000/notes/${createdNote.id}`);

  expect(del.status()).toBe(200);
});
