var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    nicknames = [];

server.listen(8080);

app.get('/', function (req, res) {
   res.sendfile(__dirname + '/index.html');
});


io.sockets.on('connection', function (socket) {

   // socket.on('new user', function (data, callback) {
   //    if(nicknames.indexOf(data) != -1){
   //       callback(false);
   //    }else{
   //       callback(true);
   //       socket.nickname = data;
   //       nicknames.push(socket.nickname);
   //       io.socket.emit('username', nicknames);
   //    }
   // });

   socket.on('send message', function (data) {
      io.sockets.emit('new message', data);
   });
});