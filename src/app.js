const express = require("express");
const cors = require("cors");

const errorHandler = require("./middleware/handleErrors");
const productsRoutes = require("./domains/product/routes/productsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productsRoutes);

app.use(errorHandler);

module.exports = app;