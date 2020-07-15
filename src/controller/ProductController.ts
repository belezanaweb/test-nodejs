import { Request, Response } from "express";
import { ProductBusiness } from "../business/ProductBusiness";
import { ProductDataBase } from "../data/ProductDataBase";

export class ProductController {
    private static ProductBusiness = new ProductBusiness(new ProductDataBase())

    public createProduct(req: Request, res: Response): any {
        try {

            ProductController.ProductBusiness.createProduct(
                req.body.sku, 
                req.body.name, 
                req.body.inventory
            )

            res.status(200).send({ message: "Created Product"})

        } catch (err) {
            res.status(err.errorCode || 400).send({ message: err.message})
        }
    }
}