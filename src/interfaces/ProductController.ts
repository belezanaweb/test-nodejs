import { Request, Response } from "express";
import ProductUseCase from "../application/usecases/ProductUseCases";
import Product from "../domain/Product";

class ProductController {
  private productUseCase: ProductUseCase;

  constructor(productUseCase: ProductUseCase) {
    this.productUseCase = productUseCase;
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const productData: Product = req.body;
      const prodToCreate = new Product(
        productData.sku,
        productData.name,
        productData.inventory
      );
      const product = await this.productUseCase.createProduct(prodToCreate);
      return res.status(201).json(product);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: "Unexpected error" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const productData: Product = req.body;
      const prodToUpdate = new Product(
        productData.sku,
        productData.name,
        productData.inventory
      );
      const product = await this.productUseCase.updateProduct(prodToUpdate);
      return res.json(product);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: "Unexpected error" });
    }
  }

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const sku = parseInt(req.params.sku);
      const product = await this.productUseCase.getProduct(sku);
      return res.json(product);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: "Unexpected error" });
    }
  }
}

export default ProductController;
