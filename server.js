const express = require('express');
const app = express();
const server = require('http').Server(app);
const PORT = process.env.PORT || 3001;
const io = require('socket.io')(PORT, {
  cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
  },
});


if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

io.on("connection", socket => {
  console.log("Connected");

  socket.on('disconnect', () => {
    console.log('User disconnected.');
  });

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

server.listen(PORT);