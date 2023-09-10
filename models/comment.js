const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'sahinotes_user' },
  parent: { type: mongoose.Schema.Types.ObjectId },
  isChildComment: { type: Boolean, required: true, default: false},
  childComments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
  likedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'sahinotes_user' }]
}, {
    timestamps: true
});

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;