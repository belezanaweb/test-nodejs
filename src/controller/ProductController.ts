import { Request, Response } from "express";
import { ProductBusiness } from "../business/ProductBusiness";
import { ProductDatabase } from "../data/ProductDatabase";
import { CreateProductInputDTO } from "../dto/ProductDTO";

export class ProductController {
  private static ProductBusiness = new ProductBusiness(new ProductDatabase());

  async createProduct(req: Request, res: Response) {
    try {
      const productData: CreateProductInputDTO = {
        sku: req.body.sku,
        name: req.body.name,
        inventory: req.body.inventory,
      };

      ProductController.ProductBusiness.createProduct(
        productData.sku,
        productData.name,
        productData.inventory
      ); 

      res.status(200).send({ message: "Product created" });
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }

  async getProductBySku(req: Request, res: Response) {
    try {
      
      const result = ProductController.ProductBusiness.getProductBySku(Number(req.params.sku)); 

      res.status(200).send({ product: result });
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }
}
