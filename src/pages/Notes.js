import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Notes() {
  const navigate = useNavigate();

  // Load notes from localStorage
  const [notes, setNotes] = useState(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    return savedNotes || [];
  });

  // Add a new note
  const addNote = () => {
    const newNote = { title: `Note ${notes.length + 1}`, content: "Sample content" };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  // Logout logic
  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Notes Page</h2>

      <button
        onClick={addNote}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        Add Note
      </button>

      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

      <div style={{ marginTop: "30px" }}>
        {notes.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {notes.map((note, index) => (
              <li
                key={index}
                style={{
                  backgroundColor: "#f8f9fa",
                  marginBottom: "10px",
                  padding: "10px",
                  borderRadius: "6px",
                }}
              >
                <strong>{note.title}</strong>
                <p>{note.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No notes yet. Click “Add Note” to create one.</p>
        )}
      </div>
    </div>
  );
}

export default Notes;
