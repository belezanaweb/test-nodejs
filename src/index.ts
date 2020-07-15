import express from "express";
import {AddressInfo} from "net";
import { productRouter } from "./router/ProductRouter";

const app = express();
app.use(express.json());

app.use("/products", productRouter)

const server = app.listen(3000, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor rodando em http://localhost:${address.port}`);
    } else {
      console.error(`Falha ao rodar o servidor.`);
    }
});
 