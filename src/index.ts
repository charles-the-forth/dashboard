import * as express from 'express';
import * as SocketIO from 'socket.io';
import {Server} from 'http';
import { Socket } from 'net';

const app = express();
const server = new Server(app);
const io = new SocketIO(server);
const serverPort = 5000;

io.on('connection', (socket: Socket) => {
    socket.on('request change color', (message: String) => {
        const colors = ['green', 'red', 'yellow', 'orange', 'lime', 'blue'];
        io.sockets.emit('change color', colors[Math.floor(Math.random() * colors.length)]);
    });
});

server.listen(serverPort, () => console.log(`Listening on port ${serverPort}`));
