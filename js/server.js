var app = require('http').createServer();
var io = require('socket.io').listen(app);
app.listen(1337);

io.sockets.on('connection', function (socket)
{
	socket.on('message', function(data)
	{
		socket.broadcast.emit('message', data);
		socket.emit('message', data);
	});
});

