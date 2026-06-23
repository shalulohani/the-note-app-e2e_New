const BASE_URL = "http://localhost:5000";

// ---------------------- LOGIN USER ----------------------
export async function loginUser(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    return await response.json();
  } catch (error) {
    console.error("Login error:", error);
    return { success: false };
  }
}

// ---------------------- GET NOTES ----------------------
export async function getNotes() {
  try {
    const response = await fetch(`${BASE_URL}/notes`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
}

// ---------------------- ADD NOTE ----------------------
export async function addNote(title, content) {
  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error adding note:", error);
    return { success: false };
  }
}
