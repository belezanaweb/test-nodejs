import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
class Warehouse {
  @Prop()
  type: string;

  @Prop()
  locality: string;

  @Prop()
  quantity: number;
}

@Schema()
class Inventory {
  @Prop({ required: false, select: false })
  quantity?: number;

  @Prop({ type: Object, required: true })
  warehouses: Warehouse[];
}

@Schema()
export class Product {
  @Prop({ unique: true, required: true })
  sku: number;

  @Prop({ required: true })
  name: string;

  @Prop({ type: Object })
  inventory: Inventory;

  @Prop({ required: false, select: false })
  isMarketable?: boolean;
}

export type ProductDocument = HydratedDocument<Product>;

export const ProductSchema = SchemaFactory.createForClass(Product);
