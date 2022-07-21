const { on } = require('events');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const bodyParser = require('body-parser');
const { emit } = require('process');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
let s;
let users = []
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/createRoom.html');
});

app.post('/chatRoom', (req, res) => {
    s = { roomName, userName } = req.body;

    res.sendFile(__dirname + '/index.html');
});
io.on('connection', (socket, res) => {
   const user = { id: socket.id, user: s.userName }
    users.push(user)
    
    console.log('a user connected');
    socket.join(s.roomName)
    console.log(s.userName + " -- Entrou na sala: " + s.roomName);
    socket.on('chat message', (msg) => {
        let userChat;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == socket.id ) {
                userChat = users[i].user
            }
        } 
       
        io.to(roomName).emit('addMessage', msg, userChat)
    })
    socket.on('disconnect', (msg) => {
        console.log('desconectado');
        io.socketsLeave(roomName)
    })



});



server.listen(process.env.PORT || 3000, () => {
    console.log('listening on *:3000');
});