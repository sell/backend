const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors')
require('dotenv').config();

const items = require('./routes/api/inputs');

const app = express();

app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose.connect(db, {useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.use('/api/inputs', items, cors())

app.use(function(req, res, next) {
    res.status(404).send('not found buddy')
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Started on port ${port}`))
