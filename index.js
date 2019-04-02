var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/login.html');
});

app.get('/12345', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/*', function(req, res){
  res.write('Adgangur oheimill!');
  res.end();
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
  	console.log('a user has disconnected');
  });
  socket.on('chat message', function(msg){
  	//console.log('a user wrote: '+msg);
  	if (socket.nickName != undefined) {
      io.emit('chat message', socket.nickName+' skrifadi: '+msg);
    } else {
      io.emit('chat message', msg);
    }
  });
  socket.on('chooseNick', function(nick){
    socket.nickName = nick;    
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
