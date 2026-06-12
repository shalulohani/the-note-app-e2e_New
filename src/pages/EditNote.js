import { useState } from 'react';

export default function EditNote({ note, onUpdate, onBack }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleUpdate = () => {
    if (!title || !content) {
      alert('Please enter both title and content.');
      return;
    }
    onUpdate(title, content);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Edit Note</h2>

      <input
        id="editTitle"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <textarea
        id="editContent"
        rows="5"
        cols="40"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br /><br />

      <button id="updateNoteBtn" onClick={handleUpdate}>
        Update Note
      </button>

      <button id="backBtn" onClick={onBack} style={{ marginLeft: 10 }}>
        Back
      </button>
    </div>
  );
}
