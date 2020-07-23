import { Request, Response } from "express";
import { CreateProductUC } from "../../../business/usecase/product/createProduct";
import { produtcDatabase } from "../../../data/productDatabase";

export const createProductEndpoint = async (req: Request, res: Response) => {
    try {
        const createProductUc = new CreateProductUC(produtcDatabase);
        const result = await createProductUc.execute({
            sku: req.body.sku, 
            name: req.body.name,
            inventory: req.body.inventory,
            isMarketable: req.body.isMarketable,
        });
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({
            message: err.message,
            ...err
        })
    }
}