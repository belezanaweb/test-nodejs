import express from "express";
import { AddressInfo } from "net";
import { productRouter } from "./router/ProductRouter";

const app = express();
var cors = require('cors')

app.use(express.json());
app.use(cors())

app.use("/products", productRouter);

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em http://localhost:${address.port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});