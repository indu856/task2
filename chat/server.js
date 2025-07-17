const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve frontend files from 'public' folder
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('✅ A user connected:', socket.id);

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // broadcast to all
  });

  socket.on('disconnect', () => {
    console.log('❌ A user disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
