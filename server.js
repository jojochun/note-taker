const express = require('express');
// to write data to db.json file
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;

// npm package that gives each note a unique ID when it's saved
const {
    v4: uuidv4

} = require('uuid');

// db.json used to store/retrieve notes using fs module
const notes = require('./db/db.json');

const app = express();
// parse incoming (POST)data (into key/value pairs that is accessed in req.body object)
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON (POST)data
app.use(express.json());

app.use(express.static('public'));


// HTML routes:  1) GET /notes returns notes.html
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET * returns index.html for anything else
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);


// API route 1) GET/api/notes reads the db.json file , returns saved notes as JSON
app.get('/api/notes', (req, res) => {
    // log request to terminal
    console.info(`${req.method} request received to get notes`);

    //send notes to client
    return res.json(notes);
});
// API route 2) POST/api/notes receives new note to save on the request body, adds it to db.json, returns to client
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);

    //destructuring for items in req.body
    const {
        title,
        text
    } = req.body;

    //Check to see if there is anything in the request body
    if (req.body && req.body.title && req.body.text) {

        //variable for the object to be saved
        const newNote = {
            title,
            text,
            id: uuidv4()
        };

        //console.log(parsedData);
        notes.push(newNote);

        //write the string to db
        fs.writeFile('./db/db.json', JSON.stringify(notes, null, 4), (err) => {
            err ? console.error(err) : console.log(`Note for ${newNote.title} has been written to JSON file`);
        });
    }
    res.json(`Note ${title} has been written`);
});




// add delete route: DELETE/api/notes/:id, receives a query parameter containing id of note to delete.  read db.json, remove note with id, rewrite notes to db.json
app.delete('/api/notes/:id', (req, res) => {
    console.info(`${req.method} request received to delete note`);

    const id = req.params.id;
    notes.forEach((note, index) => {

        if (note.id === id) {
            notes.splice(index, 1);
            fs.writeFile('./db/db.json', JSON.stringify(notes, null, 4), (err) => {
                err ? console.error(err) : console.log(`Failed to write to file`);
            });
            res.json(`Note with id ${id} has been deleted`);
        }
    });
});




app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});
