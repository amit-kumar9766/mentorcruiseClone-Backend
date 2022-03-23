import express, { Application } from 'express';

import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
require('dotenv').config();

//app
const app: Application = express();
const port = 4000;

app.use(cors());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json()); //please search more!
const db = process.env.MONGO_CONNECTION;

// Connect to MongoDB
mongoose
    .connect(db!, {
        //useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    .then(() => {
        console.log('connection successfull');
    })
    .catch((error) => console.log('no connnection', error));

app.get('/', (req, res) => {
    res.send('Hello World! amit');
});

app.get('/user', function (req, res) {
    res.send('GET request to the homepage');
});

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
