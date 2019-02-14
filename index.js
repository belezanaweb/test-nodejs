const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

require("./config/config");
require("./config/mongoose");

const server = express();
const PORT = process.env.PORT;

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());
server.use(helmet());

require("./config/routes")(server);

server.listen(PORT, () => {
  console.log(`Api running on port: ${PORT}`);
});

module.exports = { server };
