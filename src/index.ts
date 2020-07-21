const express = require("express");
const bodyParser = require("body-parser");
import { AddressInfo } from "net";
import { productRouter } from "./router/ProductRouter";



const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


export const DB = {
    products: [
        {
            "sku": 43264,
            "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
            "inventory": {
                "quantity": 15,
                "warehouses": [
                    {
                        "locality": "SP",
                        "quantity": 12,
                        "type": "ECOMMERCE"
                    },
                    {
                        "locality": "MOEMA",
                        "quantity": 3,
                        "type": "PHYSICAL_STORE"
                    }
                ]
            },
            "isMarketable": true
        }
    ]
}




app.use("/product", productRouter)

const server = app.listen(process.env.PORT || 3000, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});