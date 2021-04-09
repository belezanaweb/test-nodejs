import { Request, response, Response } from "express";
import { ProductsInputDTO } from "../business/entities/Product";
import { ProductBusiness } from "../business/ProductBusiness";


export class ProductController{
    public createPost(req: Request, res: Response){
        try {
            const productInput: ProductsInputDTO={
                sku: req.body.sku,
                name: req.body.name,
                inventory: req.body.inventory
            }
            res
                .status(200)
                .send("Product created successfully")

        } catch (error) {
            res
            .status(error.statusCode || 400)
            .send({error: error.message});
            
        }
    }
}