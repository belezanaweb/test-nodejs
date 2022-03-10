import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateWarehouseSchema } from '../../warehouse/schemas/create-warehouse.schema';

export class CreateInventorySchema {
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => CreateWarehouseSchema)
  warehouses: CreateWarehouseSchema[];
}
