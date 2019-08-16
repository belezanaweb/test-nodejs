import { HttpError } from 'routing-controllers';
import { Inject, Service } from 'typedi';

import ProductEntity from '../entities/ProductEntity';
import Product from '../interfaces/Product';
import ProductRepository from '../repositories/ProductRespository';
import { ProductNotFoundError } from './../api/errors/ProductNotFoundError';
import { validate } from './validations/ProductValidationSchema';

@Service()
export class ProductService {
  @Inject()
  repository: ProductRepository;

  private validatePayload(payload: Product): void {
    const error = validate(payload);
    if (error) {
      throw new HttpError(400, error);
    }
  }

  private verifyDuplication(sku: number): void {
    if (this.repository.getBySku(sku)) {
      throw new HttpError(409, `Product with SKU ${sku} already exists.`);
    }
  }

  private verifyNotFound(sku: number): void {
    if (!this.repository.getBySku(sku)) {
      throw new ProductNotFoundError(`Product with SKU ${sku} not found.`);
    }
  }

  getAll(): Product[] {
    return this.repository.getAll();
  }

  getBySku(sku: number): Product {
    this.verifyNotFound(sku);

    return this.repository.getBySku(sku);
  }

  insert(product: Product): Product {
    this.validatePayload(product);
    this.verifyDuplication(product.sku);

    const nextProduct = new ProductEntity(product);
    this.repository.insert(nextProduct);

    return this.repository.getBySku(nextProduct.sku);
  }

  update(sku: number, product: Product): Product {
    this.verifyNotFound(sku);
    this.validatePayload(product);
    const nextProduct = new ProductEntity(product);
    this.repository.update(sku, nextProduct);

    return this.repository.getBySku(nextProduct.sku);
  }

  remove(sku: number): null {
    this.verifyNotFound(sku);
    this.repository.remove(sku);

    return null;
  }
}
