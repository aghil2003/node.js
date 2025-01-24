const http = require('http')
const express = require('express');
const {Server} = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session= require('express-session');
const MongoStore = require('connect-mongo');
const nocache = require('nocache');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const connectDB = require('./server/config/db');

const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
// app.use(nocache()); // Prevent caching

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized:true,
  store:MongoStore.create({
    mongoUrl:process.env.MONGO_URL
  })
}))

// Static files
app.use(express.static('public'));

// Templating Engine
app.use(expressLayout);
app.set('layout', './layout/main');
app.set('view engine', 'ejs');
 
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  userId = socket.id;
    console.log('User online:', userId);
    io.emit('userStatus', { userId, status: 'online' }); 
  // Listen for incoming 'newchat' events
  socket.on('newchat', (message) => {
  console.log("Received new chat message:", message);
  socket.broadcast.emit('message', message);
  socket.broadcast.emit('notification',data={
    senderId:message.sender_id,
    message:message.message,
    isRead:false,
    date:new Date()
  });
  console.log('Broadcast done:', message);
  console.log('Broadcast done:', data);
    
  });
  
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});
  

  
const Chat = require('./server/models/Chat');// Ensure this path points to your Chat model
  io.on('connection', (socket) => {
  console.log('A user connected');
  // Handle the 'existsChat' event
  socket.on('existsChat', async function (data) {
    try {
      // Query MongoDB for existing chats between the sender and receiver
      const chat = await Chat.find({
        $or: [
          { sender_id: data.sender_id, receiver_id: data.receiver_id },
          { sender_id: data.receiver_id, receiver_id: data.sender_id },
        ],
      }).sort({ timestamp: 1 }); // Sort messages by timestamp (oldest first)

      // Emit the 'loadchats' event with the chat data
      socket.emit('loadchats', { chat: chat });
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  });
});

  

// Routes
app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/login'));
app.use('/', require('./server/routes/chat'));



// Logout route
app.get('/logout', (req, res) => {
  res.clearCookie('token');
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

const ErrorController = require('./server/controllers/ErrorController');
app.use(ErrorController.get404);
// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});


