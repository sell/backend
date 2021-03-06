const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());

const items = require('./routes/api/inputs');

app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose.connect(db, {useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.use('/api/inputs', items)

app.use(function(req, res, next) {
    res.status(404).send('not found buddy')
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Started on port ${port}`))
