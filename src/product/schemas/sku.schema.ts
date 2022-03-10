import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class SkuSchema {
  @IsNumber()
  @Type(() => Number)
  sku: number;
}
