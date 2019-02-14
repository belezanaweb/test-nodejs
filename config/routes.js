const express = require("express");
const product = require("../api/product/productRoutes");

module.exports = server => {
  const router = express.Router();

  product(router);

  server.use("/api", router);
};
