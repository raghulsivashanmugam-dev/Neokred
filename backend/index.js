require("dotenv").config();

const port = 4000;
const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const socketIO = require('socket.io');
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

// for parsing application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(fileUpload());

const https = require('https');
const httpServer = require("http").createServer(app);
var currentServer = httpServer; // httpServer or httpsServer

currentServer.keepAliveTimeout = 61 * 1000;
currentServer.listen(port, function () {
    console.log('server up and running at %s port------', port);
});
const io = socketIO(currentServer, { cors: { origin: "*" } });

//init database
const InitiateMongoServer = require("./config/db");
InitiateMongoServer()


//load index file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle code updates
    socket.on('updateCode', (code) => {
        console.log("codeee", code)
        // Broadcast the code update to all connected clients

        socket.broadcast.emit('codeUpdated', code);

    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// router
const user = require("./router/user.router");
const code = require("./router/code.router");

app.use("/api/user", user)
app.use("/api", code)