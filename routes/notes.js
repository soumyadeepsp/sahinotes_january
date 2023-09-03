const notesController = require("../controllers/notes_controller");
const express = require('express');
const router = express.Router();

router.post('/upload', notesController.uploadNotes);
router.get('/get-all-notes', notesController.getAllNotes);
router.post('/like', notesController.likeNote);
router.post('/comment', notesController.addComment);

module.exports = router;