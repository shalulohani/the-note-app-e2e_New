const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const DB_PATH = "./db.json";

// Helper to read DB
function readDB() {
  const data = fs.readFileSync(DB_PATH, "utf8");
  return JSON.parse(data);
}

// Helper to write DB
function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// ---------------------- LOGIN ROUTE ----------------------
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
    return res.json({ message: "Login successful" });
  }

  return res.status(401).json({ error: "Invalid credentials" });
});

// ---------------------- GET NOTES ----------------------
app.get("/notes", (req, res) => {
  const db = readDB();
  res.json(db.notes || []);
});

// ---------------------- ADD NOTE ----------------------
app.post("/notes", (req, res) => {
  const db = readDB();
  const newNote = {
    id: Date.now(),
    title: req.body.title,
    content: req.body.content
  };

  db.notes.push(newNote);
  writeDB(db);

  res.json(newNote);
});

// ---------------------- EDIT NOTE ----------------------
app.put("/notes/:id", (req, res) => {
  const db = readDB();
  const noteId = Number(req.params.id);

  const noteIndex = db.notes.findIndex(n => n.id === noteId);
  if (noteIndex === -1) {
    return res.status(404).json({ error: "Note not found" });
  }

  db.notes[noteIndex].title = req.body.title;
  db.notes[noteIndex].content = req.body.content;

  writeDB(db);

  res.json({ message: "Note updated successfully" });
});

// ---------------------- DELETE NOTE ----------------------
app.delete("/notes/:id", (req, res) => {
  const db = readDB();
  const noteId = Number(req.params.id);

  const updatedNotes = db.notes.filter(n => n.id !== noteId);
  db.notes = updatedNotes;

  writeDB(db);

  res.json({ message: "Note deleted successfully" });
});

// ---------------------- START SERVER ----------------------
app.listen(5000, () => {
  console.log("Mock backend running on port 5000");
});
