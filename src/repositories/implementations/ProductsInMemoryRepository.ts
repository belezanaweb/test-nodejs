import Product from '../../domain/entities/Product';
import ProductDTO from '../../use-cases/product/ProductDTO';

import ICreateProductRepository from '../ICreateProductRepository';
import IDeleteProductRepository from '../IDeleteProductRepository';
import IGetAllProductsRepository from '../IGetAllProductsRepository';
import IGetProductRepository from '../IGetProductRepository';
import IUpdateProductRepository from '../IUpdateProductRepository';

export default class ProductInMemoryRepository implements
  IDeleteProductRepository,
  IGetAllProductsRepository,
  IGetProductRepository,
  IUpdateProductRepository,
  ICreateProductRepository {
    private list: Product[];

    constructor(list: Array<Product> = []) {
      this.list = list;
    }

  async create(data: ProductDTO): Promise<Product> {
      this.list.push(data);

      return this.countQuantities(data);
    }

  async delete(sku: number): Promise<void> {
      const index = this.list.findIndex(item => item.sku === sku);

      this.list.splice(index);
    }

  async getAll(): Promise<Product[]> {
      const list = this.list.map(this.countQuantities);

      return Promise.resolve(list);
    }

  async get(sku: number): Promise<Product | undefined> {
      const product = this.list.find(item => item.sku === sku);

      if (!product) return undefined;

      return this.countQuantities(product);
    }

  async update(sku: number, data: ProductDTO): Promise<Product> {
      const index = this.list.findIndex(item => item.sku === sku);

      Object.assign(this.list[index], { ...data, sku });

      return this.countQuantities(this.list[index]);
    }


  private countQuantities(item: Product): Product {
      item.inventory.quantity = item.inventory.warehouses.reduce(
        (acc, curr) => acc + curr.quantity, 0
      );
      item.isMarketable = item.inventory.quantity !== 0;

      return item;
    }
  }
