import { Request, Response } from "express";
import { GetProductBySkuUC } from "../../../business/usecase/product/getProductSku";
import { produtcDatabase } from "../../../data/productDatabase";

export const getProductBySkuEndpoint = async (req: Request, res: Response) => {
    try {
        const getProductBySkuUc = new GetProductBySkuUC(produtcDatabase);
        const result = await getProductBySkuUc.execute({
            sku: req.body.sku
        });
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({
            message: err.message,
            ...err
        })
    }
}