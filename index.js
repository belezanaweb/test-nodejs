const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

require('./src/routes/index')(app);

const server = app.listen(port);

module.exports = app;