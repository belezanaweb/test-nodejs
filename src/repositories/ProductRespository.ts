import { Inject, Service } from 'typedi';

import config from '../config';
import MemoryDb from '../database/MemoryDb';
import Product from '../interfaces/Product';

@Service()
export default class ProductRepository {
  @Inject()
  private db: MemoryDb;

  private get collection(): Product[] {
    return this.db.get(config.collections.product) as Product[];
  }

  private set nextCollection(products: Product[]) {
    this.db.set(config.collections.product, products);
  }

  getAll(): Product[] {
    return this.collection;
  }

  getBySku(sku: number): Product {
    const [product] = this.collection.filter((p: Product): boolean => p.sku === sku);

    return product;
  }

  insert(product: Product): void {
    this.collection.push(product);
  }

  update(sku: number, product: Product): void {
    this.remove(sku);
    this.insert(product);
  }

  remove(sku: number): void {
    this.nextCollection = this.collection.filter((p: Product): boolean => p.sku !== sku);
  }
}
