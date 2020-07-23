import express, { Request, Response } from "express";
import { createProductEndpoint } from "./product/createProduct";
import { getProductBySkuEndpoint } from "./product/getProductSku";
import { updateProductEndpoint } from "./product/updateProduct";
import { deleteProductEndpoint } from "./product/deleteProduct";

const app = express();
app.use(express.json());

app.post("/createproduct", createProductEndpoint);
app.get("/productsku", getProductBySkuEndpoint);
app.post("/updateproduct", updateProductEndpoint);
app.delete("/deleteproduct", deleteProductEndpoint);


export default app;
