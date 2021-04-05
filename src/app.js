const express = require('express');
const router = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/product', router);

module.exports = app;
