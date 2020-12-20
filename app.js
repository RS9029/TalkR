//dependancies

const mysql = require('mysql');
const express = require('express');
const socketio = require('socket.io');
const path = require('path');
const http = require('http');

//config
const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(express.static(path.join(__dirname, 'public')));


// runs when connecttion complete
io.on('connection',socket =>{
    console.log('back end clear');
})



server.listen(process.env.PORT||3000,()=>{
    console.log('server is running');
})