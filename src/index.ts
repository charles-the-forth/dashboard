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

    /*const port = new SerialPort('/dev/ttyACM0', {
        baudRate: 57600,
        parser: new SerialPort.parsers.Readline('\n')
    });*/

    let index = 0;

    setInterval(() => {
        io.sockets.emit('data updated', {
            temperature: {
                time: index,
                temperatureExternal: getRandomInt(30),
                temperatureCanSat: getRandomInt(40),
                temperatureMPU: getRandomInt(25),
            },
            pressure: {
                time: index,
                pressureExternal: getRandomInt(1000),
                pressureCanSat: getRandomInt(1000)
            },
            humidity: {
                time: index,
                humidityExternal: getRandomInt(50),
                humidityCanSat: getRandomInt(40)
            },
            lightIntensity: {
                time: index,
                value: getRandomInt(400)
            },
            acceleration: {
                time: index,
                x: getRandomInt(10),
                y: getRandomInt(10),
                z: getRandomInt(10),
            },
            rotation: {
                time: index,
                x: getRandomInt(10),
                y: getRandomInt(10),
                z: getRandomInt(10),
            }
        });
        index++;
    }, 1000);
});

server.listen(serverPort, () => console.log(`Listening on port ${serverPort}`));

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));  

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
