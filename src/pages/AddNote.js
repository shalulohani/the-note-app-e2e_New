import { useState } from 'react';

export default function AddNote({ onSave, onBack }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    if (!title || !content) {
      alert('Please enter both title and content.');
      return;
    }
    onSave(title, content);
    setTitle('');
    setContent('');
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Add New Note</h2>

      <input
        id="noteTitle"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <textarea
        id="noteContent"
        placeholder="Note Content"
        rows="5"
        cols="40"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br /><br />

      <button id="saveNoteBtn" onClick={handleSave}>
        Save Note
      </button>
      <button id="backBtn" onClick={onBack} style={{ marginLeft: 10 }}>
        Back to Notes
      </button>
    </div>
  );
}
