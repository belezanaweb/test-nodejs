global.absoluteRequire = name => require(`${__dirname}/app/${name}`);

const express = require('express');
const setupApp = absoluteRequire('setup');
const app = express();

setupApp(app);

module.exports = app;
