const { createNewNote, validateNote, deleteNote } = require('../../lib/notes');
const notes = require('../../db/db.json');
const router = require('express').Router();


// API route 1) GET/api/notes reads the db.json file , returns saved notes as JSON
router.get('/notes', (req, res) => {

    //send notes to client
    return res.json(notes);
});


// API route 2) POST/api/notes receives new note to save on the request body, adds it to db.json, returns to client
router.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {

        // add note to json file and notes array in this function
        const note = createNewNote(req.body, notes);

        res.json(note);
    }
});

// add delete route: DELETE/api/notes/:id, receives a query parameter containing id of note to delete.  read db.json, remove note with id, rewrite notes to db.json
router.delete('/notes/:id', (req, res) => {


    deleteNote(req.params.id, notes);
    res.send('Note successfully deleted!');
});

module.exports = router;