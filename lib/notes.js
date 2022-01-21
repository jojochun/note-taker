const fs = require('fs');
const path = require('path');

// npm package that gives each note a unique ID when it's saved
const uuid = require('uuid');

function createNewNote(note, notesArray) {

    note.id = uuid();
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notesArray }, null, 2)
    );
    return note;
};

//  validate note
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

function deleteNote(id, notesArray) {
    notesArray.splice(
        notesArray.indexOf(notesArray.filter((note) => note.id === id)[0]),
        1
    );
    // notesArray = notesArray.filter((note) => note.id !== id);
    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(notesArray)
    );
    return notesArray;
};



module.exports = {
    createNewNote,
    validateNote,
    deleteNote,
};
