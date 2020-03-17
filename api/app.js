var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var mongoose = require('mongoose');

// var indexRouter = require('./routes/index');
// var userRouter = require('./routes/user');
// var chatRouter = require('./routes/chat');
// var authRouter = require('./routes/auth');

const chatService = require('./services/chatService');
const userService = require('./services/userService');

var app = express();
app.use(cors());

var io = require('socket.io')();
// app.set('socketio', io);

io.listen(80);

mongoose.connect('mongodb://localhost/squadly', {
  useNewUrlParser: true
});


io.on('connection', function (socket) {

  socket.on('insertMessage', function (data) {
    chatService.insertMessage(data).then(d => {
      chatService.getChat(data).then(d => {
        socket.emit('chat', d);
      })
    });
  });

  socket.on('newUser', function (data) {
    userService.newUser(data).then(u => {
      socket.emit('newUserSuccess', u);
    })
  });

  socket.on('getChat', function (data) {
    chatService.getChat(data).then(d => {
      socket.emit('chat', d);
    });
  })

  socket.on('getChats', function (data) {
    chatService.getChats(data).then(d => {
      socket.emit('chats', d);
    });
  })

  // socket.on('login', function (data) {
  //   chatService.getChat().then(d => {
  //     socket.emit('loginResponse', d);
  //   });
  // })

  socket.on('newChat', function (data) {
    chatService.newChat(data).then(d => {
      socket.emit('newChatResponse', d);
    });
  })

});

module.exports = app;