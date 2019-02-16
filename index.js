const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.port || 3000;

app.use('/api', require('./routes/route'));

// Starting server
app.listen(port);
