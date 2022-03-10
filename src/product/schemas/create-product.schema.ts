import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateInventorySchema } from '../../inventory/schemas/create-inventory.schema';

export class CreateProductSchema {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  sku: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateInventorySchema)
  inventory: CreateInventorySchema;
}
