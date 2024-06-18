const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.broadcast.emit('notification', 'A user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
        socket.broadcast.emit('notification', 'A user disconnected');
    });

    socket.on('chat message', (data) => {
        io.emit('chat message', data);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});