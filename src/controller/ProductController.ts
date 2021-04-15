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
}

export default new ProductController()