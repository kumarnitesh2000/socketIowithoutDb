const express = require('express');
const soketIo = require('socket.io');
const http = require('http');
const PORT = 5000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);



server.listen(PORT, () => {console.log(`Server is up and Running on port ${PORT}`)});



