import { Prop, Schema } from '@nestjs/mongoose';
import { Warehouse } from './warehouse.entity';

@Schema()
export class Inventory {
  @Prop()
  quantity: number;

  @Prop()
  warehouses: Warehouse[];
}
