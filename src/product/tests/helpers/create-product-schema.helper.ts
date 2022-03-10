import { plainToClass } from 'class-transformer';
import { CreateProductSchema } from '../../schemas';

export class CreateProductSchemaHelper {
  static getInstance() {
    const plain = {
      sku: 1234,
      name: 'Shampoo',
      inventory: {
        warehouses: new Array(0),
      },
    };

    return plainToClass(CreateProductSchema, plain);
  }
}
