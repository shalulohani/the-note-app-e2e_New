import React, { useState, useEffect } from 'react';
import './Notes.css';

function Notes() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');

  // Load notes from localStorage when component mounts
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (note.trim() === '') return;
    setNotes([...notes, note]);
    setNote('');
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  // Filter notes based on search term
  const filteredNotes = notes.filter((n) =>
    n.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="notes-container">
      <h2 className="notes-title">Notes</h2>

      {/* Add Note Section */}
      <div>
        <input
          className="notes-input"
          type="text"
          placeholder="Enter note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button className="add-btn" onClick={addNote}>
          Add Note
        </button>
      </div>

      {/* Search Bar */}
      <input
        className="notes-search"
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Notes List */}
      <ul className="notes-list">
        {filteredNotes.map((n, i) => (
          <li key={i} className="note-item">
            {n}
            <button className="delete-btn" onClick={() => deleteNote(i)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;
