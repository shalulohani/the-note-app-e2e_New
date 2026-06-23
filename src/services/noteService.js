const API_URL = "http://localhost:4000";

export async function getNotes() {
  const response = await fetch(`${API_URL}/notes`);
  return response.json();
}

export async function createNote(text) {
  const response = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  return response.json();
}

export async function editNote(id, text) {
  const response = await fetch(`${API_URL}/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  return response.json();
}

export async function deleteNote(id) {
  const response = await fetch(`${API_URL}/notes/${id}`, {
    method: "DELETE"
  });
  return response.json();
}
