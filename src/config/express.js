const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const load = require('express-load');

module.exports = () => {
  // Express app
  const app = express();

  // Support parsing of application/json type post data
  app.use(bodyParser.json());
  // Support parsing of application/x-www-form-urlencoded post data
  app.use(bodyParser.urlencoded({extended: true}));
  // CORS
  app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }));
  // Helmet
  app.use(helmet());

  load('controllers', {cwd: 'app'})
    .then('routes')
    .into(app);

  return app;
};
