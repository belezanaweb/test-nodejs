  
import { Request, Response } from "express"
import { ProductBusiness } from "../business/ProductBusiness"
import { ProductDb } from "../db/ProductDb"

export class ProductController {
    private static ProductBusiness = new ProductBusiness(new ProductDb())

    public createProduct(req: Request, res: Response): void {
        try {
            console.log(req.body)
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

            res.status(200).send({ message: "Product updated"})

        } catch (err) {
            res.status(err.errorCode || 400).send({ message: err.message})
        }
    }

    public getProduct(req: Request, res: Response): void {
        try {
            const sku = req.params.sku;
    
            const product = ProductController.ProductBusiness.getProduct(Number(sku))

            res.status(200).send({ product })

        } catch (err) {
            res.status(err.errorCode || 400).send({ message: err.message})
        }
    }

    public deleteProduct(req: Request, res: Response): void {
        try {
            const sku = req.params.sku;
    
            ProductController.ProductBusiness.deleteProduct(Number(sku))
    
            res.status(200).send({ message: "Product deleted" })

        } catch (err) {
            res.status(err.errorCode || 400).send({ message: err.message})
        }
    }
}