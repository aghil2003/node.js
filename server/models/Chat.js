const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the Message Schema
const ChatSchema = new Schema({
  sender_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Login-user', 
    required: true
  },
  receiver_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Login-user', 
    required: true 
  },
  message: {
    type: String,
    required: true, 
    maxlength: 1000
  },
  isRead: { type: Boolean, default: false },
  timestamp: {
    type: Date,
    default: Date.now 
  }
});


const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
