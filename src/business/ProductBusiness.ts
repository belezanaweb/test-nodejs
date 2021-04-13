import { products } from "../data/product";
import { CustomError } from "./error/CustomError";
import {
  Inventory,
  Product,
  ProductInput,
  productsOutput,
} from "../business/entities/Product";
import { response } from "express";

export class ProductBusiness {
  public createProduct(sku: number, name: string, inventory: Inventory) {
    try {
      if (!sku || !name || !inventory) {
        throw new CustomError(422, "Please fill in all the fields.");
      }
      const newProduct: ProductInput = {
        sku,
        name,
        inventory,
      };

      if (products.sku === newProduct.sku) {
        throw new CustomError(404, "Product already registered");
      }

      products.push(newProduct);
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  public getProductBySku(sku: number) {
    try {
      const product = productsOutput;

      const getSku = products.filter((product: Product) => product.sku === sku);
      if (!getSku) {
        throw new CustomError(404, "Sku not found");
      }

      if (!product) {
        throw new CustomError(404, "Product Not Found");
      }

      // product.updateQuantity()
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  public editProduct(sku: number, name: string, inventory: Inventory) {
    try {
      if (!sku || !name || !inventory) {
        throw new CustomError(422, "Missing input");
      }

      if (products.sku === sku) {
        throw new CustomError(404, "Product not found");
      }

      const edit = {
        sku,
        name,
        inventory,
      };
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  public deleteProduct(sku: number){
    try {
      if (products.sku === sku) {
        throw new CustomError(404, "Product not found");
      }
      
    } catch (error) {
      throw new CustomError(error.statusCode, error.message)
      
    }
    
  }
}
