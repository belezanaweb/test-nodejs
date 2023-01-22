import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import { ProductInventoryDto } from './product.dto';

export class ProductResponseInventoryDto extends ProductInventoryDto {
  @ApiProperty({
    type: 'number',
    description: 'Total quantity in inventory.',
  })
  @IsNumber()
  @IsNotEmpty()
  public quantity: number;
}

export class ProductResponseDto {
  @ApiProperty({
    type: 'number',
    description: 'Stock Keeping Unit.',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  public sku: number;

  @ApiProperty({
    type: 'string',
    description: 'Name of product.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    type: ProductResponseInventoryDto,
    description: 'Payload of inventory.',
    required: true,
  })
  @IsObject()
  @Type(() => ProductResponseInventoryDto)
  @IsNotEmpty()
  public inventory: ProductResponseInventoryDto;

  @ApiProperty({
    type: 'boolean',
    description:
      'A product is marketable whenever its inventory.quantity is greater than 0',
  })
  @IsBoolean()
  public isMarketable: boolean;
}
