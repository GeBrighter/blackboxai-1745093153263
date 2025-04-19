const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let messages = [];

// API endpoint to get all messages
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

// API endpoint to post a new message
app.post('/api/messages', (req, res) => {
  const { username, text } = req.body;
  if (!username || !text) {
    return res.status(400).json({ error: 'Username and text are required' });
  }
  const message = {
    id: messages.length + 1,
    username,
    text,
    timestamp: new Date().toISOString()
  };
  messages.push(message);
  res.status(201).json(message);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
