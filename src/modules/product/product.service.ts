import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}
  async findOne(sku: number): Promise<Product> {
    const product: Product = this.productRepository.findOne(sku);
    const quantity = product.inventory.warehouses
      .map((warehouse) => {
        return warehouse.quantity;
      })
      .reduce((acc, curr) => acc + curr);
    product.inventory.quantity = quantity;
    product.isMarketable = Boolean(quantity > 0);
    return product;
  }
}
