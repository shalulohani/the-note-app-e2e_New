import React, { useState } from 'react';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddOrUpdateNote = () => {
    if (newNote.trim() === '') return;

    if (editIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = newNote;
      setNotes(updatedNotes);
      setEditIndex(null);
    } else {
      setNotes([...notes, newNote]);
    }

    setNewNote('');
  };

  const handleEditNote = (index) => {
    setNewNote(notes[index]);
    setEditIndex(index);
  };

  const handleDeleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  // Filter notes by search term
  const filteredNotes = notes.filter((note) =>
    note.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Your Notes</h1>

      {/* 🔍 Search bar */}
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '1rem', width: '70%' }}
      />

      <br />

      <input
        placeholder="Write a note"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
      />

      <button onClick={handleAddOrUpdateNote}>
        {editIndex !== null ? 'Update' : 'Add'}
      </button>

      <ul>
        {filteredNotes.map((note, index) => (
          <li key={index}>
            {note}
            <button onClick={() => handleEditNote(index)}>Edit</button>
            <button onClick={() => handleDeleteNote(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
