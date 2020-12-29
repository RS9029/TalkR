//dependancies

const mysql = require('mysql');
const express = require('express');
const socketio = require('socket.io');
const path = require('path');
const http = require('http');
const createMessage = require('./utilities/createMessage');
const {initUser,getUser,userLeaves,getUsersList} = require('./utilities/users');


//config
const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(express.static(path.join(__dirname, 'public')));
app.set('view-engine','html');


// runs when connection to client complete

const talkRBotName = "KoalaBot";

io.on('connection',socket =>{
    console.log('back end clear');

    socket.on('userJoin',({user,rooms})=>{

        const newUser = initUser(socket.id,user,rooms);

        socket.join(newUser.roomName);

        //user connects message
        socket.broadcast.to(newUser.roomName).emit("newConnect", createMessage(talkRBotName,`${newUser.userName} has connected!`));

        //welcome message
        socket.emit('welcome', createMessage(talkRBotName,`Welcome to talkR ${newUser.userName}`));

        //send user list to client
        io.to(newUser.roomName).emit('userList',{users:getUsersList(newUser.roomName)});

    })

    // when user leaves a chat

    socket.on('disconnect',()=>{
        const user = userLeaves(socket.id);
        if(user){
            io.to(user.roomName).emit('goodbye',createMessage(talkRBotName,`${user.userName} has left the chat`));
            io.to(user.roomName).emit('userList',{users:getUsersList(user.roomName)});
        }
    })


    //new message to client
    
    socket.on('newMessage',msg=>{
        const user = getUser(socket.id);
        io.to(user.roomName).emit('message',createMessage(user.userName,msg));
    })
    
})

server.listen(process.env.PORT||3000,()=>{
    console.log('server is running');
})