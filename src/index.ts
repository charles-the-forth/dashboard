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
            connectWithPort(portNames[numberInput - 1]);
        } else {
            console.log('Exiting program due to wrong input.');
            process.exit();
        }
    });

});

const connectWithPort = portName => {
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

                console.log(data);
            }
            index++;
        });
    });
};

server.listen(serverPort, () => console.log(`Listening on port ${serverPort}`));
