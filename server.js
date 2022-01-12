const express = require('express');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

// db.json used to store/retrieve notes using fs module
// HTML routes:  1) GET /notes returns notes.html, 2) GET * returns index.html
// API route 1) GET/api/notes reads the db.json file , returns saved notes as JSON
// API route 2) POST/api/notes receives new note to save on the request body, adds it to db.json, returns to client
// npm package that gives each note a unique ID when it's saved
// DELETE/api/notes/:id, receives a query parameter containing id of note to delete.  read db.json, remove note with id, rewrite notes to db.json





app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});
