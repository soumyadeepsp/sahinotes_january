const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, maxLength: 15, minLength: 3 },
  mobile: { type: String },
  email_opt: { type: String },
  mobile_otp: { type: String },
  mobile_verified: {type: Boolean, default: false},
  passwordEditInitiation: {type: Date},
  expiryDate: { type: Date },
  notesList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'notes' }],
  likedNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'notes' }],
}, {
    timestamps: true
});

const User = mongoose.model('sahinotes_user', userSchema);

module.exports = User;