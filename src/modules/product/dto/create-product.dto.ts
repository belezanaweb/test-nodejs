import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsNotEmpty,
  IsString,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';

class WarehouseDto {
  @IsString({ message: 'Valor do campo "type" informado é inválido' })
  @IsNotEmpty({ message: 'Campo "type" não pode estar vazio' })
  @ApiProperty()
  type: string;

  @IsString({ message: 'Valor do campo "locality" informado é inválido' })
  @IsNotEmpty({ message: 'Campo "locality" não pode estar vazio' })
  @ApiProperty()
  locality: string;

  @IsNumber({}, { message: 'Valor do campo "quantity" informado é inválido' })
  @IsNotEmpty({ message: 'Campo "quantity" não pode estar vazio' })
  @ApiProperty()
  quantity: number;
}

class InventoryDto {
  @ValidateNested({ each: true })
  @ArrayMinSize(0, { message: 'Campo "warehouses" não informado' })
  @Type(() => WarehouseDto)
  @ApiProperty({ type: () => [WarehouseDto] })
  warehouses: WarehouseDto[];
}

export class CreateProductDto {
  @IsNumber({}, { message: 'Valor do campo "sku" informado é inválido' })
  @IsNotEmpty({ message: 'Campo "sku" não pode estar vazio' })
  sku: number;

  @IsString({ message: 'Valor do campo "name" informado é inválido' })
  @IsNotEmpty({ message: 'Campo "name" não pode estar vazio' })
  @ApiProperty()
  name: string;

  @ValidateNested()
  @IsNotEmpty({ message: 'Campo "inventory" não pode estar vazio' })
  @Type(() => InventoryDto)
  @ApiProperty({ type: () => InventoryDto })
  inventory: InventoryDto;
}
