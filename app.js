var express = require('express');
var cors = require('cors');
var app = express();
var port = process.env.PORT || 3000;
var serv = require('http').Server(app);
const mongoose = require('mongoose');

require('dotenv').config();

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established");
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

serv.listen(port, () => {
    console.log('Server started');
});

var SOCKET_LIST = {}
var PLAYER_LIST = {}

var Player = function(id) {
    var self = {
        x: 250,
        y: 250,
        id: id,
        number: "" + Math.floor(10 * Math.random())
    }
    return self;
}

var USERS = {
    "bob":"asd",
    "bob2":"bob",
    "bob3":"ttt",
}

var isValidPassword = function(data,cb) {
    setTimeout(function() {
        cb(USERS[data.username] === data.password);
    },10);
}

var isUsernameTaken = function(data,cb) {
    setTimeout(function() {
        cb(USERS[data.username]);
    },10);
}

var addUser = function(data,cb) {
    setTimeout(function() {
        USERS[data.username] = data.password;
        cb();
    },10);
}

var io = require('socket.io')(serv,{});
io.on('connection', function(socket){
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;
    
    var player = Player(socket.id);
    PLAYER_LIST[socket.id] = player;
    // console.log('Socket connection');

    socket.on('signIn', function(data) {
        isValidPassword(data,function(res){
            if(res) {
                //Player.onConnect(socket);
                socket.emit('signInResponse', {success:true});
            }
            else
                socket.emit('signInResponse', {success:false});
        });
    });

    socket.on('signUp', function(data) {
        isUsernameTaken(data, function(res){
            if(res) {
                //Player.onConnect(socket);
                socket.emit('signUpResponse', {success:false});
            }
            else {
                addUser(data, function(){
                    socket.emit('signUpResponse', {success:true});
                });
            }
        });
    });


    socket.on('disconnect', function() {
        delete SOCKET_LIST[socket.id]; 
        delete PLAYER_LIST[socket.id];
    });
});

setInterval (function(){
    var pack = [];
    for(var i in PLAYER_LIST) {
        var player = PLAYER_LIST[i];
        player.x++;
        player.y++;
        pack.push({
            x: player.x,
            y: player.y,
            number: player.number
        })
    }
    for(var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];
        socket.emit('newPosition', pack); 

    }
}, 10000/25);



