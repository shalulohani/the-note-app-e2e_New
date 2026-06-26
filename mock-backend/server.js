const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router(path.join(__dirname, 'db.json'));

server.use(middlewares);
server.use(jsonServer.bodyParser);

// ⭐ LOGIN ROUTE
server.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!router.db) {
    return res.status(500).json({ message: 'Database not loaded' });
  }

  const users = router.db.get('users').value();

  if (!users) {
    return res.status(500).json({ message: 'Users not found in database' });
  }

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    return res.status(200).json({
      message: 'Login successful',
      token: 'mock-token-123'
    });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

// ⭐ CREATE NOTE
server.post('/notes', (req, res) => {
  const notes = router.db.get('notes');
  const newNote = { id: Date.now(), ...req.body };
  notes.push(newNote).write();
  res.status(201).json(newNote);
});

// ⭐ UPDATE NOTE
server.put('/notes/:id', (req, res) => {
  const { id } = req.params;
  const updated = router.db
    .get('notes')
    .find({ id: Number(id) })
    .assign(req.body)
    .write();
  res.status(200).json(updated);
});

// ⭐ DELETE NOTE
server.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  router.db.get('notes').remove({ id: Number(id) }).write();
  res.status(200).json({ message: 'Note deleted' });
});

server.use(router);

server.listen(5000, () => {
  console.log('Mock backend running on port 5000');
});
