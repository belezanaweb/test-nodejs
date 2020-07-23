import { Request, Response } from "express";
import { UpdateProductUC } from "../../../business/usecase/product/updateProduct";
import { produtcDatabase } from "../../../data/productDatabase";

export const updateProductEndpoint = async (req: Request, res: Response) => {
    try {   
        const updateProductUC = new UpdateProductUC(produtcDatabase);        
        const result = await updateProductUC.execute({
            sku: req.body.sku, 
            name: req.body.name,
            inventory: req.body.inventory
        })
        res.status(200).send(result)
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
}