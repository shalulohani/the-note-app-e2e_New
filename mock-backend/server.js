const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// LOGIN ROUTE
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin" && password === "1234") {
    res.json({
      success: true,
      user: { name: "Admin User", email: "admin" }
    });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
});

// GET NOTES
app.get("/notes", (req, res) => {
  const data = JSON.parse(fs.readFileSync("db.json", "utf8"));
  res.json(data.notes);
});

// ADD NOTE
app.post("/notes", (req, res) => {
  const data = JSON.parse(fs.readFileSync("db.json", "utf8"));

  const newNote = {
    id: Date.now(),
    title: req.body.title,
    content: req.body.content
  };

  data.notes.push(newNote);

  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));

  res.json({ success: true, note: newNote });
});

// UPDATE NOTE
app.put("/notes/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync("db.json", "utf8"));
  const noteId = parseInt(req.params.id);

  const updatedNotes = data.notes.map((note) =>
    note.id === noteId
      ? { ...note, title: req.body.title, content: req.body.content }
      : note
  );

  data.notes = updatedNotes;

  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));

  res.json({ success: true });
});

// DELETE NOTE
app.delete("/notes/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync("db.json", "utf8"));
  const noteId = parseInt(req.params.id);

  const filteredNotes = data.notes.filter((note) => note.id !== noteId);
  data.notes = filteredNotes;

  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));

  res.json({ success: true });
});

// START SERVER ON PORT 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
