const notesController = require("../controllers/notes_controller");
const express = require('express');
const router = express.Router();

router.get('/note1', notesController.noteController1);
router.get('/note2', notesController.noteController2);

module.exports = router;