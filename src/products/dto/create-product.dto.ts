import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Inventory } from '../entities/inventory.entity';

export class CreateProductDto {
  @IsNumber()
  sku: string;

  @IsString()
  name: string;

  @ValidateNested()
  inventory: Inventory;
}
