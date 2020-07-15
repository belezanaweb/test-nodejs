import { Request, Response } from "express";
import { ProductBusiness } from "../business/ProductBusiness";
import { ProductDataBase } from "../data/ProductDataBase";

export class ProductController {
    private static ProductBusiness = new ProductBusiness(new ProductDataBase())

    public createProduct(req: Request, res: Response): void {
        try {

            ProductController.ProductBusiness.createProduct(
                req.body.sku, 
                req.body.name, 
                req.body.inventory
            )

            res.status(201).send({ message: "Created Product"})

        } catch (err) {
            res.status(err.errorCode || 400).send({ message: err.message})
        }
    }

    public editProduct(req: Request, res: Response): void {
        try {
            const sku = req.params.sku;
    
            ProductController.ProductBusiness.editProduct(
                Number(sku),
                req.body.sku,
                req.body.name,
                req.body.inventory
            )

            res.status(200).send({ message: "Updated Product"})

        } catch (err) {
            res.status(err.errorCode || 400).send({ message: err.message})
        }
    }

    public recuperationProduct(req: Request, res: Response) {
        try {
            const sku = req.params.sku;
    
            const product = ProductController.ProductBusiness.recuperationProduct(Number(sku))

            res.status(200).send({ product })

        } catch (err) {
            res.status(err.errorCode || 400).send({ message: err.message})
        }
    }

    public deleteProduct(req: Request, res: Response) {
        try {
            const sku = req.params.sku;

            ProductController.ProductBusiness.deleteProduct(Number(sku))
    
            res.status(200).send({ message: "Deleted Product" })

        } catch (err) {
            res.status(err.errorCode || 400).send({ message: err.message})
        }
    }
}