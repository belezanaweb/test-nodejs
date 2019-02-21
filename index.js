const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('express-async-errors');
require('./routes/ProductRoutes')(app);

const PORT = 5000;
const mongoURI = 'mongodb://blznaweb:blznaweb1@ds139775.mlab.com:39775/blznaweb';

mongoose.connect(mongoURI, { useNewUrlParser: true })
    .then(app.listen(PORT, console.log(`Server running on port: ${PORT}`)))
    .catch(err => console.log(err));
