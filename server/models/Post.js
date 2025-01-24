
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: 'Login-user', // Ensure this matches your User model name
    required: true
  },
  
  isActive: {
    type: String,
    enum: ['true', 'false'], // Only allows 'true' or 'false' strings
    default: 'true' // Default value is 'true'
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Post', PostSchema);
