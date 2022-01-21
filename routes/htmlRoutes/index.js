const router = require("express").Router();
const path = require("path");



// HTML routes:  1) GET /notes returns notes.html
router.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '../../public/notes.html'))
);

// GET * returns index.html for anything else
router.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '../../public/index.html'))
);

module.exports = router;
