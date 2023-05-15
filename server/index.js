const path = require('path');
const express = require('express');

// Create a server on port 5500
const port = process.env.PORT || 3001;

const app = express();
const server = require('http').createServer(app);
// socket.io
var io = require('socket.io')(server, {
  cors: {
    origin: "*",
  }
});

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

io.on('connection', (socket) => {
    socket.on('vertical', (data) => {
      io.emit('vertical-display', data);
    })

    socket.on('horizontal', (data) => {
      io.emit('horizontal-display', data);
    })

    socket.on('fire', (data) => {
      io.emit('shotFired');
    })
});