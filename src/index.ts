import * as express from 'express';
import * as SocketIO from 'socket.io';
import { Server } from 'http';
import { Socket } from 'net';
import * as SerialPort from 'serialport';

const app = express();
const server = new Server(app);
const io = new SocketIO(server);
const serverPort = 5000;

const standard_input = process.stdin;
standard_input.setEncoding('utf-8');

io.on('connection', (socket: Socket) => {
    console.log("Enter port that you want to use:");
    const portNames = [];

    SerialPort.list((err, ports) =>
        ports.forEach((port, index) => {
            portNames.push(port.comName);
            console.log((index + 1) + ' - ' + port.comName);
        })
    );

    standard_input.on('data', data => {
        const numberInput = Number(data);
        if (numberInput !== NaN && numberInput <= portNames.length) {
            connectToPort(portNames[numberInput - 1]);
        } else {
            console.log('Exiting program due to wrong input.');
            process.exit();
        }
    });

});

const connectToPort = portName => {
    const port = new SerialPort(portName, {
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
            if (buffer.indexOf('END') !== -1) {
                const data = buffer.substring(buffer.indexOf('START') + 6, buffer.indexOf('END') - 1);
                buffer = buffer.substring(buffer.indexOf('\n') + 1);

                io.sockets.emit('data updated', transformToDataObject(data.split(/[=;]/), index));
            }
            index++;
        });
    });
};

server.listen(serverPort, () => console.log(`Listening on port ${serverPort}`));

const transformToDataObject = (array, index) => {
    const result = {
        messageId: array[0],
        temperature: {
            time: index,
            temperature: parseFloat(array[1])
        },
        pressure: {
            time: index,
            temperature: parseFloat(array[2])
        },
        humidity: {
            time: index,
            humidity: parseFloat(array[3])
        },
        lightIntensity: {
            time: index,
            lightIntensity: parseFloat(array[4])
        },
        altitude: {
            time: index,
            altitude: parseFloat(array[5]),
        },
        numberOfSatellites: parseInt(array[6]),
        year: parseInt(array[7]),
        month: parseInt(array[8]),
        day: parseInt(array[9]),
        hour: parseInt(array[10]),
        minute: parseInt(array[11]),
        second: parseInt(array[12]),
        lat: parseGPS(array[13], array[15]),
        lng: parseGPS(array[14], array[16]),
    };

    return result;
}

const parseGPS = (latInt, lat) => Math.floor(parseInt(latInt) / 100) + ((parseInt(latInt) % 100 + parseFloat('0.' + lat)) / 60);