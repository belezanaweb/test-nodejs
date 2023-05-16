import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
class Warehouse {
  @Prop()
  type: string;

  @Prop()
  locality: string;

  @Prop()
  quantity: string;
}

@Schema()
class Inventory {
  @Prop({ type: Warehouse })
  warehouses: Warehouse[];
}

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ unique: true })
  sku: string;

  @Prop()
  name: string;

  @Prop({ type: Inventory })
  inventory: Inventory;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
