import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { ProductInventoryDto } from './product.dto';

export class UpdateProductDto {
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
