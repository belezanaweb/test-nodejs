import { Request, Response } from "express"
import { ProductInputDTO } from '../entities/Product'

export class ProductController {

    public createProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: ProductInputDTO = {
                sku: req.body.sku,
                name: req.body.name,
                inventory: req.body.inventory
            }


            res.status(201).send({ message: "Show created" })
        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })
        }
    }
}