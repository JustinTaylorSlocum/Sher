const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3001;

const messageFormat = require('./utils/messageFormat');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getUsers,
} = require('./utils/users');

/* const io = require('socket.io')(3001, {
  cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
  },
}); */

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

var currentMedia = undefined;

io.on("connection", socket => {

  socket.on('join', username => {
    const user = userJoin(socket.id, username);
    socket.emit('chat message', messageFormat("System", 'Welcome to Sher!'));
    socket.broadcast.emit('chat message', messageFormat("System", user.username + ' joined.'));
    io.emit('roomUsers', getUsers());
    if (currentMedia !== undefined) {
      socket.emit('newMedia', currentMedia);
    }
  });

  socket.on('chat message', msg => {
    const user = getCurrentUser(socket.id);
    io.emit('chat message', messageFormat(user.username, msg));
  });

  socket.on('isTyping', data => {
    const user = getCurrentUser(socket.id);
    const userTyping = {typing: data.typing, user: user.username};

    if (data.typing) {
      io.emit('isTyping', userTyping);
    } else {
      io.emit('isTyping', userTyping);
    }
  });
  
   socket.on('disconnect', () => {
/*   const user = getCurrentUser(socket.id);
    console.log(user.username + ' disconnected.'); */
    userLeave(socket.id);
    io.emit('roomUsers', getUsers());
    if (getUsers().length < 1) {
      currentMedia = undefined;
      console.log("Room empty. Clearing media.");
    }
  }); 

  socket.on('playMedia', () => {
    socket.broadcast.emit('playMedia');
  });

  socket.on('pauseMedia', () => {
    socket.broadcast.emit('pauseMedia');
  });

  socket.on('mediaSeek', time => {

  });

  socket.on('mediaEnd', () => {
    currentMedia = undefined;
    console.log("MEDIA END");
  });

  socket.on('newMedia', media => {
    currentMedia = media;
    io.emit('newMedia', media);
  });
});

server.listen(PORT, () => {
  console.log("Connected to port: " + PORT);
});

/* const express = require('express');
const app = express();
const server = require('http').Server(app);
/* const io = require('socket.io')(server); */
/* const PORT = process.env.PORT || 3001; */

/*  const io = require('socket.io')(3001, {
  cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
  },
}); 
 */

/* if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
} */
/* 
io.on("connection", socket => {
  console.log("Connected");
  io.emit("system message", "Connected to chat.")

  socket.on('disconnect', () => {
    console.log('User disconnected.');
  });

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
}); */

/* server.listen(PORT, () => {
  console.log("Connected to port: " + PORT);
}); */