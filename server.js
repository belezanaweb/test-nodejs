const express = require("express");
const routes = require("./router.js");

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3000);

module.exports = app;
