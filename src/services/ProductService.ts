import { Product } from "../models/Product";
import ProductRepository from "../repository/interfaces/ProductRepository";

export class ProductService {

  constructor(private productRepository: ProductRepository) { }

  public async create(product: Product): Promise<Product> {
    return await this.productRepository.create(product);
  }
  public async get(sku: number): Promise<Product> {
    const product = await this.productRepository.get(sku);

    if (product) {
      let quantity = 0;
      product.inventory.warehouses.forEach(warehouse => {
        quantity += warehouse.quantity;
      })

      product.inventory.quantity = quantity;
      quantity > 0 ? product.isMarketable = true : product.isMarketable = false;
    }

    return product;
  }
  public async update(sku: number, product: Product): Promise<Product> {
    return await this.productRepository.update(sku, product);
  }
  public async delete(sku: number): Promise<boolean> {
    return await this.productRepository.delete(sku);
  }
}
