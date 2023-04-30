import { Request, Response } from 'express';
import Product from '../../domain/entities/product.entity';
import ProductUseCase from '../../application/use_cases/product.useCase';

class ProductHttpController {
  private productUseCase: ProductUseCase;

  constructor(productUseCase: ProductUseCase) {
    this.productUseCase = productUseCase;
  }

  async createProduct(req: Request, res: Response): Promise<Response> {
    try {
      const productData = req.body as Product;
      const newProduct = new Product(productData.sku, productData.name, productData.inventory);
      const product = await this.productUseCase.createProduct(newProduct);
      return res.status(201).json(product);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: 'Unexpected error' });
    }
  }

  async updateProduct(req: Request, res: Response): Promise<Response> {
    try {
      const sku = parseInt(req.params.sku);
      const productData = req.body as Product;
      const newProduct = new Product(productData.sku, productData.name, productData.inventory);
      const product = await this.productUseCase.updateProduct(sku, newProduct);
      return res.status(200).json(product);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: 'Unexpected error' });
    }
  }

  async getProduct(req: Request, res: Response): Promise<Response> {
    try {
      const sku = parseInt(req.params.sku);
      const product = await this.productUseCase.getProduct(sku);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      return res.status(200).json(product);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: 'Unexpected error' });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<Response> {
    try {
      const sku = parseInt(req.params.sku);
      await this.productUseCase.deleteProduct(sku);
      return res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: 'Unexpected error' });
    }
  }
}

export default ProductHttpController;
