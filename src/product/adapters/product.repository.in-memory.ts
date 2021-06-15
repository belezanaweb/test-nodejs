import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { NotFoundEntityPersistenceError } from '../errors/persistence.error';
import { IProductRepository } from '../repository/product.repository.interface';

const storage: Product[] = [];

@Injectable()
export class ProductRepositoryInMemory extends IProductRepository {
  async createOne(product: Product): Promise<Product> {
    storage.push(product);
    return product;
  }

  async findOne(sku: number): Promise<Product | null> {
    return storage.find((e) => e.sku === sku);
  }

  async updateOne(sku: number, product: Partial<Product>): Promise<Product> {
    const foundedProductIndex = storage.findIndex((e) => e.sku === sku);
    if (foundedProductIndex < 0)
      throw new NotFoundEntityPersistenceError(
        `Entity with sku: ${sku}, not founded`,
      );

    const foundedProduct = storage[foundedProductIndex];

    const updatedProduct = {
      ...foundedProduct,
      ...product,
      inventory: {
        warehouses:
          product.inventory?.warehouses ?? foundedProduct.inventory?.warehouses,
      },
    };

    storage.splice(foundedProductIndex, 1, updatedProduct);

    return updatedProduct;
  }

  async deleteOne(sku: number): Promise<Product> {
    const foundedProductIndex = storage.findIndex((e) => e.sku === sku);
    if (foundedProductIndex < 0)
      throw new NotFoundEntityPersistenceError(
        `Entity with sku: ${sku}, not founded`,
      );

    return storage.splice(foundedProductIndex, 1)[0];
  }

  truncate() {
    storage.splice(0, Number.MAX_VALUE);
  }
}
