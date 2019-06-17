import * as express from 'express';
import * as SocketIO from 'socket.io';
import { Server } from 'http';
import { Socket } from 'net';
import * as SerialPort from 'serialport';

const app = express();
const server = new Server(app);
const io = new SocketIO(server);
const serverPort = 5000;
let running = false;

const standard_input = process.stdin;
standard_input.setEncoding('utf-8');

io.on('connection', (socket: Socket) => {
    if (!running) {
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
    }
});

const connectToPort = portName => {
    const port = new SerialPort(portName, {
        baudRate: 57600,
        parser: new SerialPort.parsers.Readline('\n')
    });

    port.on('open', () => {
        running = true;
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
        messageId: parseInt(array[0]),
        lightIntensity: {
            time: index,
            lightIntensity: parseFloat(array[1])
        },
        temperature: {
            time: index,
            temperatureCanSat: parseFloat(array[2]),
            temperatureExternal: parseFloat(array[3]),
        },
        pressure: {
            time: index,
            pressureCanSat: parseFloat(array[8]),
            pressureExternal: parseFloat(array[9]),
        },
        humidity: {
            time: index,
            humidityCanSat: parseFloat(array[6]),
            humidityExternal: parseFloat(array[7]),
        },
        altitude: {
            time: index,
            altitudeCanSat: parseFloat(array[10]),
            altitudeExternal: parseFloat(array[11]),
        },
        numberOfSatellites: parseInt(array[12]),        
        lat: parseGPS(array[13], array[15]),
        lng: parseGPS(array[14], array[16]),
        co2: {
            SCD30: parseFloat(array[17]),
            CCS811: parseFloat(array[18]),
        },
        tvoc: parseFloat(array[19]),
        o2Concentration: parseFloat(array[20]),
    };

    return result;
}

const parseGPS = (latInt, lat) => Math.floor(parseInt(latInt) / 100) + ((parseInt(latInt) % 100 + parseFloat('0.' + lat)) / 60);