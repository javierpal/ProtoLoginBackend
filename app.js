const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const auth = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configurar  cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY,Origin, x-Requested-Width, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, OPTIONS, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/api/auth/', auth);

module.exports = app;