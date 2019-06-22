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
        uvIndex: parseFloat(array[2]),
        temperature: {
            time: index,
            temperatureCanSat: parseFloat(array[3]),
            temperatureMPU: parseFloat(array[4]),
            temperatureExternal: parseFloat(array[5]),
            tempSCD30: parseFloat(array[7]),
            ambientTemp: parseFloat(array[8]),
        },
        humidity: {
            time: index,
            humidityCanSat: parseFloat(array[10]),
            humidityExternal: parseFloat(array[11]),
            humiditySCD30: parseFloat(array[12]),
        },
        pressure: {
            time: index,
            pressureCanSat: parseFloat(array[13]),
            pressureExternal: parseFloat(array[14]),
        },
        altitude: {
            time: index,
            altitudeCanSat: parseFloat(array[15]),
            altitudeExternal: parseFloat(array[16]),
        },
        accX: {
            time: index,
            accX: parseFloat(array[17]),
        },
        accY: {
            time: index,
            accY: parseFloat(array[18]),
        },
        accZ: {
            time: index,
            accZ: parseFloat(array[19]),
        },
        rotX: {
            time: index,
            accX: parseFloat(array[20]),
        },
        rotY: {
            time: index,
            accY: parseFloat(array[21]),
        },
        rotZ: {
            time: index,
            accZ: parseFloat(array[22]),
        },
        magX: {
            time: index,
            magX: parseFloat(array[23]),
        },
        magY: {
            time: index,
            magY: parseFloat(array[24]),
        },
        magZ: {
            time: index,
            magZ: parseFloat(array[25]),
        },
        lat: parseGPS(array[26], array[28]),
        lng: parseGPS(array[27], array[29]),
        co2: {
            time: index,
            SCD30: parseFloat(array[30]),
            CCS811: parseFloat(array[31]),
        },
        tvoc: parseFloat(array[32]),
        oxygenConcetration: {
            time: index,
            oxygenConcetration: parseFloat(array[33]),
        },
        spectroscope: {
            time: index,
            a: parseFloat(array[34]),
            b: parseFloat(array[35]),
            c: parseFloat(array[36]),
            d: parseFloat(array[37]),
            e: parseFloat(array[38]),
            f: parseFloat(array[39]),
            g: parseFloat(array[40]),
            h: parseFloat(array[41]),
            i: parseFloat(array[42]),
            j: parseFloat(array[43]),
            k: parseFloat(array[44]),
            l: parseFloat(array[45]),
            r: parseFloat(array[46]),
            s: parseFloat(array[47]),
            t: parseFloat(array[48]),
            u: parseFloat(array[49]),
            v: parseFloat(array[50]),
            w: parseFloat(array[51]),
        },
        numberOfSatellites: parseInt(array[52]),
        radioStrength: calculateSignalStrength(array[53]),
    };

    return result;
}

const parseGPS = (latInt, lat) => Math.floor(parseInt(latInt) / 100) + ((parseInt(latInt) % 100 + parseFloat('0.' + lat)) / 60);

const calculateSignalStrength = dbm => 10 * Math.log(Math.pow(10, dbm/10) * 1000);