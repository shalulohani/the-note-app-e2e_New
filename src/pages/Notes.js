import React, { useState } from 'react';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAdd = () => {
    setTitle('');
    setContent('');
    setEditingIndex(null);
    setShowForm(true);
  };

  const handleEdit = (index) => {
    setTitle(notes[index].title);
    setContent(notes[index].content);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      // Editing existing note
      const updated = [...notes];
      updated[editingIndex] = { title, content };
      setNotes(updated);
    } else {
      // Adding new note
      setNotes([...notes, { title, content }]);
    }

    setShowForm(false);
    setTitle('');
    setContent('');
    setEditingIndex(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Notes</h1>

      <button onClick={handleAdd}>Add Note</button>

      {showForm && (
        <div style={{ marginTop: '20px' }}>
          <input
            placeholder="Enter note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br /><br />
          <textarea
            placeholder="Enter note content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <br /><br />
          <button onClick={handleSave}>Save</button>
        </div>
      )}

      <div style={{ marginTop: '30px' }}>
        {notes.map((note, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => handleEdit(index)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}
