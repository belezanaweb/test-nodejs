import { Request, Response } from "express";
import ProductBusiness from "../business/ProductBusiness";

export class ProductController {

    public async createProduct(req:Request, res:Response) {
        try {
            const {name} = req.body
            const result = await ProductBusiness.createProduct(name)
            res.status(200).send(result)
        }
        catch (error) {
            console.log(error)
        }
    }

    public async editProductBySku(req:Request, res:Response) {
        try {
            const sku = Number(req.params.id)
            const {id, quantity} = req.body
            const result = await ProductBusiness.editProductBySku(sku, id, quantity)
            res.status(200).send(result)
        }
        catch (error) {
            console.log(error)
        }
    }

    public async delProductBySku(req:Request, res:Response) {
        try {
            const sku = Number(req.params.id)
            const result = await ProductBusiness.delProductBySku(sku)
            res.status(200).send(result)
        }
        catch (error) {
            console.log(error)
        }
    }

    public async getProductBySku(req:Request, res:Response) {
        try {
            const sku = Number(req.params.id)
            const result = await ProductBusiness.getProductBySku(sku)
            res.status(200).send(result)
        }
        catch (error) {
            console.log(error)
        }
    }
}

export default new ProductController()