const names = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

// This API route is a GET Route for retrieving all notes from the db file
names.get('/notes', (req, res) => {
  
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        res.json(json);
      });
  });
  
// This API route is a POST Route for a new note
names.post('/notes', (req, res) => {
 
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
names.delete('/notes/:note_id', (req, res) => {
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

module.exports = names;