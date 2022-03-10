import { plainToClass } from 'class-transformer';
import { CreateWarehouseSchema } from '../../schemas/create-warehouse.schema';

export class CreateWarehouseSchemaHelper {
  static getInstance() {
    const plain = {
      locality: 'ALI',
      quantity: 10,
      type: 'AQUELE',
    };

    return plainToClass(CreateWarehouseSchema, plain);
  }
}
