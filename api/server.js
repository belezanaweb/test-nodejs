const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//main application router
require('./router')(app);

app.listen(process.env.PORT || 4000, () => console.log(`Application up and running on port ${process.env.PORT || 4000}`));

module.exports = app;