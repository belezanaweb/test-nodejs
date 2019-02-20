const express = require('express');
const mongoose = require('mongoose');


const app = express();
const PORT = 5000;
const mongoURI = 'mongodb://blznaweb:blznaweb1@ds139775.mlab.com:39775/blznaweb';

mongoose.connect(mongoURI, { useNewUrlParser: true })
    .then(app.listen(PORT, console.log(`Server running on port: ${PORT}`)))
    .catch(err => console.log(err));
