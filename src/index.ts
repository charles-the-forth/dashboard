import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

const serviceAccount = require('../../../Downloads/cansatweb-1547364100927-firebase-adminsdk-b30cq-ad9f633c25.json');


const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cansatweb-1547364100927.firebaseio.com"
});

const db = admin.firestore();

const upload = () => {
    fs.readFile(path.join(__dirname, '../csv/result.csv'), (err, data) => {
        const lines = data.toString().split('\n');
        lines.splice(0, 1);
        lines.map(line => {
            const values = line.split(';');
    
            if (values.length >= 37) {
                const result = {
                    messageId: parseInt(values[0]),
                    light: parseInt(values[1]),
                    capacity: parseInt(values[2]),
                    temperatureCanSat: parseFloat(values[4]),
                    temperatureMPU: parseFloat(values[5]),
                    temperatureExternal: parseFloat(values[6]),
                    humidityCanSat: parseFloat(values[7]),
                    humidityExternal: parseFloat(values[8]),
                    airQuality: parseFloat(values[9]),
                    pressureCanSat: parseFloat(values[10]),
                    pressureExternal: parseFloat(values[11]),
                    altitudeCanSat: parseFloat(values[12]),
                    altitudeExternal: parseFloat(values[13]),
                    accelerationX: parseFloat(values[14]),
                    accelerationY: parseFloat(values[15]),
                    accelerationZ: parseFloat(values[16]),
                    rotationX: parseFloat(values[17]),
                    rotationY: parseFloat(values[18]),
                    rotationZ: parseFloat(values[19]),
                    magnetometerX: parseFloat(values[20]),
                    magnetometerY: parseFloat(values[21]),
                    magnetometerZ: parseFloat(values[22]),
                    year: parseInt(values[23]),
                    month: parseInt(values[24]),
                    day: parseInt(values[25]),
                    hour: parseInt(values[26]),
                    minute: parseInt(values[27]),
                    second: parseInt(values[28]),
                    numberOfSatellites: parseInt(values[29]),
                    lat: parseGPS(values[30], values[32]),
                    lng: parseGPS(values[31], values[33]),
                    shuntVoltage: parseFloat(values[34]),
                    busVoltage: parseFloat(values[35]),
                    current: parseFloat(values[36]),
                    loadVoltage: parseFloat(values[37])
                };
                return result;
            } else {
                return {};
            }
        })
        .filter((it: any) => it.messageId >= 1986 && it.messageId <= 2086)
        .map((it: any) => {
            it.messageId -= 1985;
            return it;
        })
        .forEach((it: any) => db.collection('results').add(it).then(ref => console.log(it.messageId)));
    });    
};

const parseGPS = (latInt, lat) => Math.floor(parseInt(latInt) / 100) + ((parseInt(latInt) % 100 + parseFloat('0.' + lat)) / 60);    

upload();