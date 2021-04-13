import { Request, Response } from "express";
import {
  Product,
  ProductInput,
  productsOutput,
  updateQuantity,
} from "../business/entities/Product";
import { products } from "../data/product";

export class ProductController {
  public createProduct(req: Request, res: Response) {
    try {
      const newProduct: ProductInput = {
        sku: req.body.sku,
        name: req.body.name,
        inventory: req.body.inventory,
      };
      updateQuantity();

      products.push(newProduct);

      res.status(200).send("Product created successfully");
    } catch (error) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  }

  public getProductBySku(req: Request, res: Response) {
    try {
      const sku = parseInt(req.params.sku);

      const result = productsOutput.map((product) => ({
        sku: product.sku,
        name: product.name,
        inventory: product.inventory,
        updateQuantity,
      }));

      res.status(200).send(result[0]);
    } catch (error) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  }

  public editProduct(req: Request, res: Response) {
    try {
      const sku = parseInt(req.params.sku);

      const edit = {
        sku,
        name: req.body.name,
        inventory: req.body.inventory,
      };

      res.status(200).send("Updated product");
    } catch (error) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  }

  public deleteProduct(req: Request, res: Response) {
    try {
      const sku = parseInt(req.params.sku);

      const del = products.filter((product) => product.sku === sku);

      res.status(200).send(del)
      
    } catch (error) {
        res.status(error.statusCode || 400).send({ error: error.message });
    }
  }
}
