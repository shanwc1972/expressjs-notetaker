const express = require('express');
const path = require('path');

const { clog } = require('./middleware/clog');
const api = require('./routes/api.js');

const PORT = process.env.PORT || 3001;

const app = express();

//Adding clog middleware to monitor our GET, POST and DELETE requests
app.use(clog);

//Body parser middleware for our POSTs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Wildcard route to direct users to to index.html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);