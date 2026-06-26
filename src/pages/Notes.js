import { useEffect, useState } from "react";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Load notes from backend
  const fetchNotes = async () => {
    const response = await fetch("http://localhost:5000/notes");
    const data = await response.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Add a new note
  const addNote = async () => {
    if (!newNote.trim()) return;

    const response = await fetch("http://localhost:5000/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newNote })
    });

    if (response.ok) {
      setNewNote("");
      fetchNotes();
    }
  };

  // Start editing
  const startEdit = (note) => {
    setEditingId(note.id);
    setEditingText(note.text);
  };

  // Save edited note
  const saveEdit = async (id) => {
    const response = await fetch(`http://localhost:5000/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: editingText })
    });

    if (response.ok) {
      setEditingId(null);
      setEditingText("");
      fetchNotes();
    }
  };

  // Delete note
  const deleteNote = async (id) => {
    const response = await fetch(`http://localhost:5000/notes/${id}`, {
      method: "DELETE"
    });

    if (response.ok) {
      fetchNotes();
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", marginTop: "40px" }}>
      <h2>Notes</h2>

      <div>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="New note"
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "8px",
            boxSizing: "border-box"
          }}
        />
        <button onClick={addNote} style={{ padding: "8px 12px" }}>
          Add Note
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "24px" }}>
        {notes.map((note) => (
          <li
            key={note.id}
            className="note-item"
            style={{
              marginBottom: "16px",
              border: "1px solid #ccc",
              padding: "12px",
              borderRadius: "4px"
            }}
          >
            {editingId === note.id ? (
              <div>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    boxSizing: "border-box",
                    marginBottom: "8px"
                  }}
                />
                <button
                  onClick={() => saveEdit(note.id)}
                  style={{ padding: "8px 12px", marginRight: "8px" }}
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  style={{ padding: "8px 12px" }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <p style={{ margin: "0 0 8px" }}>{note.text}</p>
                <button
                  onClick={() => startEdit(note)}
                  style={{ padding: "8px 12px", marginRight: "8px" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  style={{ padding: "8px 12px" }}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
