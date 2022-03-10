import { plainToClass } from 'class-transformer';
import { ProductEntity } from '../../entities/product.entity';

export class ProductEntityHelper {
  static getInstance() {
    const plain = {
      sku: 1234,
      name: 'Shampoo',
      isMarketable: false,
      inventory: {
        warehouses: new Array(0),
        quantity: 0,
      },
    };

    return plainToClass(ProductEntity, plain);
  }
}
