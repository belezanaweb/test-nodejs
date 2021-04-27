const express = require("express");

module.exports = () => {
  const app = express();

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set("port", "3000");

  // MIDDLEWARES
  app.use(express.json());

  return app;
};
