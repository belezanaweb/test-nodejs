const express = require('express');
const app = express();
var bodyParser = require('body-parser')

//Rotas
const index = require('./routes/index');
const produtosRoute = require('./routes/produtosRoute.js');

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', index);
app.use('/v1/products', produtosRoute);

module.exports = app;