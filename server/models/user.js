const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  email: String,
  photo: String,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
