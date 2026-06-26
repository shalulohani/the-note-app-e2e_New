const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// ⭐ LOGIN ROUTE
server.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = router.db.get('users').value();

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

// ⭐ NOTES ROUTES (Create, Edit, Delete)
server.post('/notes', (req, res) => {
  const notes = router.db.get('notes');
  const newNote = { id: Date.now(), ...req.body };
  notes.push(newNote).write();
  res.status(201).json(newNote);
});

server.put('/notes/:id', (req, res) => {
  const { id } = req.params;
  const updated = router.db.get('notes').find({ id: Number(id) }).assign(req.body).write();
  res.status(200).json(updated);
});

server.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  router.db.get('notes').remove({ id: Number(id) }).write();
  res.status(200).json({ message: 'Note deleted' });
});

server.use(router);

server.listen(5000, () => {
  console.log('Mock backend running on port 5000');
});
