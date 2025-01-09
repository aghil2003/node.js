const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LoginUserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true    // Removes extra spaces
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email is unique
    match: [/.+@.+\..+/, 'Please enter a valid email'] // Basic email validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Enforces a minimum password length
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  role: { type: String, enum: ['Admin', 'User'], default: 'User' }, // Role field
});



module.exports = mongoose.model('Login-user',LoginUserSchema);
