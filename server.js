const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const items = require('./dist/models/api/inputs');


const app = express();

app.use(bodyParser.json());

const db = require('./dist/models/config/keys').mongoURI;

mongoose.connect(db, {useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.use('/api/inputs', items)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Started on port ${port}`))
