const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Make sure this matches your frontend's URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/customercare')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const messageSchema = new mongoose.Schema({
  text: String,
  sender: String,
  timestamp: Date,
  read: { type: Boolean, default: false }, // Read status
});

const Message = mongoose.model('Message', messageSchema);

// Create HTTP server and socket.io instance
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Allow frontend from this URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  }
});

// Middleware to authenticate JWT tokens
const authenticate = (socket, next) => {
  const token = socket.handshake.query.token; // Send token in the query

  if (!token) {
    return next(new Error('Authentication error'));
  }

  jwt.verify(token, 'your_jwt_secret_key', (err, decoded) => {
    if (err) {
      return next(new Error('Authentication error'));
    }

    socket.user = decoded; // Attach user data to the socket object
    next();
  });
};

io.use(authenticate);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id, 'User:', socket.user);

  // Handle send message event
  socket.on('send_message', async (data) => {
    try {
      console.log('Message from user:', socket.user);

      const message = new Message(data);
      await message.save();

      io.emit('receive_message', data); // Broadcast to everyone
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });

  // Handle typing event
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data); // Emit typing indicator to other users
  });

  // Handle message read status
  socket.on('message_read', async (data) => {
    try {
      const message = await Message.findByIdAndUpdate(data.messageId, { read: true });

      if (message) {
        io.emit('message_read', data.messageId); // Notify everyone that the message has been read
      }
    } catch (err) {
      console.error('Error updating message read status:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
