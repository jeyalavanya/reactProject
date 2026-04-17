// models/Users.js: Defines the User schema for registration and login.
// The schema includes name, email, and hashed password fields.
// Each user document also stores createdAt and updatedAt timestamps.
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true // Ensure email uniqueness to prevent duplicate user accounts.
    },
    password: {
      type: String,
      required: true // Password is stored hashed, not in plain text.
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);