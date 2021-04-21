/* const express = require("express");
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = 3000; */
const io = require('socket.io')(3001, {
  cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
  },
});

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