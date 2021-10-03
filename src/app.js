const express = require('express');
require('express-async-errors');

const routes = require('./route/product');

const app = express();

app.use(express.json());
app.use(routes);

app.use((err, req, res, next) => {
  return res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
