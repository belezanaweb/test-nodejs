import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Warehouse {
  @Prop()
  locality: string;

  @Prop()
  quantity: number;

  @Prop()
  type: string;
}
