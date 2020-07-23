import { Request, Response } from "express";
import { DeleteProductUC } from "../../../business/usecase/product/deleteProduct";
import { produtcDatabase } from "../../../data/productDatabase";

export const deleteProductEndpoint = async (req: Request, res: Response) => {
    try {
        const deleteProductUC = new DeleteProductUC(produtcDatabase);
        const result = await deleteProductUC.execute({
            sku: req.body.sku
        })
        res.status(200).send(result)
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
}