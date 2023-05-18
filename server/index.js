const path = require('path');
const express = require('express');
const fs = require('fs');

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

    socket.on('save-score', (data) => {
      fs.writeFile('leaderboard.txt',
        `${data}`,
        (err, file) => {
          if (err) {throw err};
        }
      )
    })

    socket.on('load-score', () => {
      fs.readFile('leaderboard.txt', "utf8", (err, data) => {
        if (err) {
          console.log(err);
        }
        try {
          const toSend = data;
          console.log(toSend);
          io.emit('data', (toSend) ? (toSend) : 0);
        } catch (err) {
          io.emit('data', "oops! an error occured");
        }
      })
    })

    socket.on('getIP', async () => {
      const ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/
      const IP = fetch('https://www.cloudflare.com/cdn-cgi/trace').then(res => (res.text())).then((data) => {
        let ip = data.match(ipRegex)[0];
        socket.emit('IP-address', ip);
      });
    })
});