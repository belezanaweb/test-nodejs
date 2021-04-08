import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ValidateNested } from 'class-validator';
import { Document } from 'mongoose';
import { Inventory } from './inventory.entity';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  sku: number;

  @Prop()
  name: string;

  @Prop()
  @ValidateNested()
  inventory: Inventory;

  // @Prop(
  //   raw({
  //     quantity: Number,
  //     warehouses: [
  //       {
  //         locality: { type: String },
  //         quantity: { type: Number },
  //         type: { type: String },
  //       },
  //     ],
  //   }),
  // )
  // inventory: {
  //   quantity: number;
  //   warehouses: [
  //     {
  //       locality: string;
  //       quantity: number;
  //       type: string;
  //     },
  //   ];
  // };

  @Prop()
  isMarketable: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
