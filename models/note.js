const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

const noteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  about: { type: String },
  fileLocation: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'sahinotes_user' },
  likedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'sahinotes_user' }],
  parentComments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }]
}, {
    timestamps: true
});

const Note = mongoose.model('notes', noteSchema);

module.exports = Note;