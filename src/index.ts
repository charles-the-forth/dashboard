import * as express from 'express';

const app = express();
const serverPort = 5000;

app.listen(serverPort, () => console.log(`Listening on port ${serverPort}`));

app.get('/express_backend', (req, res) => res.send({'express': 'YOUR EXPRESS BACKEND IS CONNECTED TO REACTs'}))
