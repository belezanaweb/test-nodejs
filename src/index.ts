import express from "express";
import { AddressInfo } from "net";
import { productRouter } from "./routes/ProductRouter";

const app = express()

app.use(express.json())
app.use("/product", productRouter)


const server = app.listen(3003, () => {
   if (server) {
      const address = server.address() as AddressInfo
      console.log(`Server running in http://localhost:${address.port}`)
   } else {
      console.error(`Error when starting server`)
   }
});