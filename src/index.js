const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const expressValidator = require("express-validator");
//const appStorage = require('localStorage');
const app = express();
const appStorage = require('./appStorage');


app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


app.get('/', (req, res) => {
    res.send('Api is runing!');
});
require('./controllers/index')(app);


app.listen(3000);

module.exports = app;

