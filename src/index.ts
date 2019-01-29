import * as express from 'express';
import * as SocketIO from 'socket.io';
import {Server} from 'http';
import { Socket } from 'net';
import * as SerialPort from 'serialport';

const app = express();
const server = new Server(app);
const io = new SocketIO(server);
const serverPort = 5000;

io.on('connection', (socket: Socket) => {

    const port = new SerialPort('/dev/ttyACM0', {
        baudRate: 57600,
        parser: new SerialPort.parsers.Readline('\n')
    });

    port.on('open', () => {
        let buffer = '';
        port.on('data', input => {
            buffer += input.toString();
            if (buffer.indexOf('\n') !== -1) {
                const data = buffer.substring(0, buffer.indexOf('\n'));
                buffer = buffer.substring(buffer.indexOf('\n') + 1);

                io.sockets.emit('data updated', transformToDataObject(data.split(/[=;]/)));
            }
        });
    });
});

server.listen(serverPort, () => console.log(`Listening on port ${serverPort}`));

const transformToDataObject = array => {
    const result = {};
    const date = new Date();

    for (let i = 0; i < array.length; i += 2) {
        result[array[i]] = {
            time: `${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`,
            value: parseFloat(array[i + 1])
        };
    }
    return result;
};
