import { Request, Response } from "express"
import { ProductBusiness } from "../business/ProductBusiness"
import { ProductDatabase } from "../database/ProductDatabase"
import { Product, ProductInputDTO } from '../entities/Product'

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

    public getProductBySku = async (req: Request, res: Response): Promise<void> => {
        try {
            const sku: number = Number(req.params.sku)

            const product: undefined| Product =await productBusiness.getProductBySku(sku)

            res.status(201).send({ product })
        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })
        }
    }

    public editProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: ProductInputDTO = {
                sku: Number(req.params.sku),
                name: req.body.name,
                inventory: req.body.inventory
            }

            await productBusiness.editProduct(input)

            res.status(201).send({ message: "Product updated" })
        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })
        }
    }

    public deleteProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const sku: number = Number(req.params.sku)

            await productBusiness.deleteProduct(sku)            

            res.status(201).send({ message: "Product deleted" })
        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })
        }
    }
}