import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { WarehousesDto } from './warehouses.dto';

export class ProductInventoryDto {
  @ApiProperty({
    type: [WarehousesDto],
    description: 'Payload of warehouse.',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WarehousesDto)
  public warehouses: WarehousesDto[];
}

export class ProductDto {
  @ApiProperty({
    type: 'number',
    description: 'Stock Keeping Unit.',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  public sku: number;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Name of product.',
    required: true,
  })
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    type: ProductInventoryDto,
    description: 'Payload of inventory.',
    required: true,
  })
  @IsObject()
  @Type(() => ProductInventoryDto)
  @IsNotEmpty()
  public inventory: ProductInventoryDto;
}
