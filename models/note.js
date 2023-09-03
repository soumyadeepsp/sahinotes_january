const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

const noteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  about: { type: String },
  fileLocation: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  parentComments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, {
    timestamps: true
});

const Note = mongoose.model('notes', noteSchema);

module.exports = Note;