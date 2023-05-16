import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
class Warehouse {
  @Prop()
  type: string;

  @Prop()
  locality: string;
}

@Schema()
class Inventory {
  @Prop({ type: Object, required: true })
  warehouses: Warehouse[];
}

@Schema()
export class Product {
  @Prop({ unique: true, required: true })
  sku: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: Object, required: true })
  inventory: Inventory;
}

export type ProductDocument = HydratedDocument<Product>;

export const ProductSchema = SchemaFactory.createForClass(Product);
