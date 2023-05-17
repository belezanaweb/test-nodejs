import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsInt({ message: 'Valor do campo "SKU" informado é inválido!' })
  sku: number;

  @IsString({ message: 'Valor do campo "name" informado é inválido!' })
  @IsNotEmpty()
  name: string;

  inventory: InventoryDto;
}

class InventoryDto {
  @ValidateNested({ each: true })
  @Type(() => WarehouseDto)
  warehouses: WarehouseDto[];
}

class WarehouseDto {
  @IsString({ message: 'Valor do campo "locality" informado é inválido!' })
  locality: string;

  @IsString({ message: 'Valor do campo "type" informado é inválido!' })
  type: string;

  @IsInt({ message: 'Valor do campo "quantity" informado é inválido!' })
  quantity: number;
}
