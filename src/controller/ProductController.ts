import { Request, Response } from "express"
import { ProductBusiness } from "../business/ProductBusiness"
import { ProductDatabase } from "../database/ProductDatabase"
import { ProductInputDTO } from '../entities/Product'

const productBusiness = new ProductBusiness(
    new ProductDatabase()
)

export class ProductController {

    public createProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: ProductInputDTO = {
                sku: req.body.sku,
                name: req.body.name,
                inventory: req.body.inventory
            }

            await productBusiness.createProduct(input)

            res.status(201).send({ message: "Product created" })
        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })
        }
    }

    public editProduct = async (req: Request, res: Response): Promise<void> => {
        try {

            res.status(201).send({ message: "" })
        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })
        }
    }

    public getProductBySku = async (req: Request, res: Response): Promise<void> => {
        try {


            res.status(201).send({ message: "" })
        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })
        }
    }

    public deleteProduct = async (req: Request, res: Response): Promise<void> => {
        try {


            res.status(201).send({ message: "" })
        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })
        }
    }
}