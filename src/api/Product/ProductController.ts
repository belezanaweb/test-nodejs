import { Request, Response } from 'express'
import ProductRepository from './ProductRepository';

class ProductController {

  index (request: Request, response: Response) {
    const products = new ProductRepository().findAll();
    return response.json(products);
  }

  store (request: Request, response: Response) {
    const product = request.body;
    const productRepository = new ProductRepository();
    productRepository.insert(product);
    return response.status(201).json(productRepository.findBySku(product.sku));
  }

  delete (request: Request, response: Response) {
    const { sku } = request.params;
    new ProductRepository().delete(+sku);
    return response.status(204).json();
  }

  update (request: Request, response: Response) {
    const { sku } = request.params;
    const productRepository = new ProductRepository();
    productRepository.update(+sku, request.body);
    return response.json(productRepository.findBySku(+sku));
  }

  show (request: Request, response: Response) {
    const { sku } = request.params;
    const product = new ProductRepository().findBySku(+sku);

    if(!product) response.status(404).json({ message : 'Product not found' })
    return response.json(product);
  }
}

export default ProductController;
