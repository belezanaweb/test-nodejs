const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.port || 3000;

app.use('/api', require());

// Starting server
app.listen(port);
console.log('The App runs on port ' + port);
