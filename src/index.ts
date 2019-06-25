import * as express from 'express';
import * as SocketIO from 'socket.io';
import { Server } from 'http';
import { Socket } from 'net';
import * as SerialPort from 'serialport';
const { Console } = require('console');

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
                
                //console.log(data);
                buffer = buffer.substring(buffer.indexOf('\n') + 1);

                io.sockets.emit('data updated', transformToDataObject(data.split(';'), index));
            }
            index++;
        });
    });
};

server.listen(serverPort, () => console.log(`Listening on port ${serverPort}`));

const transformToDataObject = (array, index) => {
    
    /*Serial.print(String(data1.humidityCanSat) + ";"+ String(data1.humidityExternal) + ";" + String(data2.humiditySCD30) + ";");
    Serial.print(String(data1.pressureCanSat) + ";" + String(data1.pressureExternal) + ";" + String(data1.altitudeCanSat) + ";");
    Serial.print(String(data1.altitudeExternal) + ";" + String(data3.accelerationX)+ ";" + String(data3.accelerationY) + ";");
    Serial.print(String(data3.accelerationZ) + ";" + String(data3.rotationX) + ";" + String(data3.rotationY) + ";");
    Serial.print(String(data3.rotationZ) + ";" + String(data3.magnetometerX) + ";" + String(data3.magnetometerY) + ";");
    Serial.print(String(data3.magnetometerZ) + ";" + String(data2.latInt) + ";" + String(data2.lonInt) + ";");
    Serial.print(String(data2.latAfterDot) + ";" + String(data2.lonAfterDot) + ";" + String(data1.co2SCD30) + ";"  + String(data1.co2CCS811) + ";");
    Serial.print(String(data2.tvoc) + ";"  + String(data2.o2Concentration) + ";");
    Serial.print(String(data4.a) + ";" + String(data4.b) + ";" + String(data4.c) + ";" + String(data4.d) + ";" + String(data4.e) + ";" + String(data4.f) + ";" + String(data4.g) + ";" + String(data4.h) + ";" + String(data4.i) + ";" + String(data4.j) + ";" + String(data4.r) + ";" + String(data4.s) + ";" + String(data4.t) + ";");
    Serial.println(String(data2.numberOfSatellites) + ";"  + String(rssi) + ";END");
    console.log(array);
    console.log(array.length);*/
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
            tempSCD30: parseFloat(array[6]),
            ambientTemp: parseFloat(array[7]),
        },
        humidity: {
            time: index,
            humidityCanSat: parseFloat(array[9]),
            humidityExternal: parseFloat(array[10]),
            humiditySCD30: parseFloat(array[11]),
        },
        pressure: {
            time: index,
            pressureCanSat: parseFloat(array[12]),
            pressureExternal: parseFloat(array[13]),
        },
        altitude: {
            time: index,
            altitudeCanSat: parseFloat(array[14]),
            altitudeExternal: parseFloat(array[15]),
        },
        accX: {
            time: index,
            accX: parseFloat(array[16]),
        },
        accY: {
            time: index,
            accY: parseFloat(array[17]),
        },
        accZ: {
            time: index,
            accZ: parseFloat(array[18]),
        },
        rotX: {
            time: index,
            accX: parseFloat(array[19]),
        },
        rotY: {
            time: index,
            accY: parseFloat(array[20]),
        },
        rotZ: {
            time: index,
            accZ: parseFloat(array[21]),
        },
        magX: {
            time: index,
            magX: parseFloat(array[22]),
        },
        magY: {
            time: index,
            magY: parseFloat(array[23]),
        },
        magZ: {
            time: index,
            magZ: parseFloat(array[24]),
        },
        lat: parseGPS(array[25], array[27]),
        lng: parseGPS(array[26], array[28]),
        co2: {
            time: index,
            SCD30: parseFloat(array[29]),
            CCS811: parseFloat(array[30]),
        },
        tvoc: parseFloat(array[31]),
        oxygenConcentration: {
            time: index,
            oxygenConcentration: parseFloat(array[32]),
        },
        spectroscope: {
            time: index,
            a: parseFloat(array[33]),
            b: parseFloat(array[34]),
            c: parseFloat(array[35]),
            d: parseFloat(array[36]),
            e: parseFloat(array[37]),
            f: parseFloat(array[38]),
            g: parseFloat(array[39]),
            h: parseFloat(array[40]),
            i: parseFloat(array[41]),
            j: parseFloat(array[42]),
            r: parseFloat(array[43]),
            s: parseFloat(array[44]),
            t: parseFloat(array[45]),
        },
        numberOfSatellites: parseInt(array[46]),
        radioStrength: calculateSignalStrength(array[47]),
    };

    return result;
}

const parseGPS = (latInt, lat) => Math.floor(parseInt(latInt) / 100) + ((parseInt(latInt) % 100 + parseFloat('0.' + lat)) / 60);

const calculateSignalStrength = dbm => 10 * Math.log(Math.pow(10, dbm/10) * 1000);