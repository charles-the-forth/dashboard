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
        let index = 0;
        let buffer = '';
        port.on('data', input => {
            if (index > 100) {
                index = 0;
            }
            buffer += input.toString();
            if (buffer.indexOf('\n') !== -1) {
                const data = buffer.substring(0, buffer.indexOf('\n'));
                buffer = buffer.substring(buffer.indexOf('\n') + 1);

                io.sockets.emit('data updated', transformToDataObject(data.split(/[=;]/), index));
            }
            index++;
        });
    });
});

server.listen(serverPort, () => console.log(`Listening on port ${serverPort}`));

const transformToDataObject = (array, index, rotation) => {
    const result = {
        temperature: {
            time: index,
            temperatureExternal: parseFloat(array[1]),
            temperatureCanSat: parseFloat(array[0]),
            temperatureMPU: parseFloat(array[2]),
        },
        pressure: {
            time: index,
            pressureExternal: parseFloat(array[4]),
            pressureCanSat: parseFloat(array[3])
        },
        humidity: {
            time: index,
            humidityExternal: parseFloat(array[6]),
            humidityCanSat: parseFloat(array[5])
        },
        lightIntensity: {
            time: index,
            value: parseFloat(array[13])
        },
        acceleration: {
            time: index,
            x: parseFloat(array[7]),
            y: parseFloat(array[8]),
            z: parseFloat(array[9]),
        },
        rotation: {
            time: index,
            x: parseFloat(array[10]),
            y: parseFloat(array[11]),
            z: parseFloat(array[12]),
        }
    };
    return result;
};
