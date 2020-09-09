const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const PORT = 5000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const {addUser,getUserInRoom,getUser,removeUser} = require('./user')

/*
app.get('/info', (req,res)=>{
    res.sendFile(__dirname + '/index.html');
})

*/

io.on("connection", (socket)=>{
    io.on('connection', (socket) => {
        console.log('a user connected');
      });
     //custom event 
    socket.on('join-room', ({name,room}, callback) => {
        console.log(`Name is ${name} , Room is ${room}`)
        
        const {error , user} =addUser({id:socket.id, name, room});
        
        if(error){
            return callback({callback: `i am callback function saying ${error}`})
        }
        console.log(user);
        socket.emit('message', {user:'admin', text: `${user.name} welcome to the room !`})
        socket.broadcast.to(user.room).emit('message', {user:'admin', text: `${user.name}, has Joined !`})
        socket.join(user.room);
        io.to(user.room).emit('roomData',{room:user.room, users:getUserInRoom(user.room)})

        callback();

    })

    socket.on('sendMsg', (message,callback) =>{

        const user = getUser(socket.id);
        //console.log(socket.id);
        //console.log(user)
        
        io.to(user.room).emit('message', {user: user.name, text: message});
        io.to(user.room).emit('roomData', {room: user.room, users:getUserInRoom()});
        //now do work at the front end
        callback();

    })


    //specific socket
    socket.on("disconnect", () =>{
        console.log("user had disconnected !");
        const user = removeUser(socket.id)
        if(user)
        io.to('user.room').emit('message', {user:'admin',text:`${user.name} has left`})
    })


})



server.listen(PORT, () => {console.log(`Server is up and Running on port ${PORT}`)});



