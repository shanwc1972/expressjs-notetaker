const express = require('express');
const path = require('path');

const { clog } = require('./middleware/clog');
const { v4: uuidv4 } = require('uuid');

const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('./helpers/fsUtils');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(clog);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// This API route is a GET Route for retrieving all notes
app.get('/api/notes', (req, res) => {
  
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      res.json(json);
    });
});

// This API route is a POST Route for a new note
app.post('/api/notes', (req, res) => {

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(newNote);
  } else {
    res.error('Error adding note');
  }
});

//This API route is a DELETE Route to remove a note from the database
app.delete('/api/notes/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile('./db/db.json')
  .then((data) => JSON.parse(data))
  .then((json) => {
    // Make a new array of all notes filtering out the one with the ID
    const result = json.filter((note) => note.id !== noteId);

    // Save that array to the filesystem
    writeToFile('./db/db.json', result);

    // Respond to the DELETE request
    res.json(`Item ${noteId} has been deleted 🗑️`);
  });
});

// Wildcard route to direct users to to index.html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
