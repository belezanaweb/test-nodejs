import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { E_WAREHOUSE_STORE_TYPE } from '../entities/product.entity';

class CreateProductWareHouseDto {
  @IsString()
  @IsNotEmpty()
  @Transform((e) => (e.value as string)?.toUpperCase())
  @ApiProperty()
  locality: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  quantity: number;

  @Transform((e) => E_WAREHOUSE_STORE_TYPE[e.value])
  @IsEnum(E_WAREHOUSE_STORE_TYPE)
  @ApiProperty({ enum: E_WAREHOUSE_STORE_TYPE })
  type: E_WAREHOUSE_STORE_TYPE;
}

class CreateProductInventoryDto {
  @Type(() => CreateProductWareHouseDto)
  @ValidateNested({ each: true })
  @ApiProperty({ type: [CreateProductWareHouseDto] })
  warehouses: CreateProductWareHouseDto[];
}

export class CreateProductDto {
  /**
   * Observação:
   * Se o valor de SKU não precisar ser calulado, ele não precisa ser um inteiro
   * Isso limita o valor máximo desta chave e oculpa espaço desnecessário
   * */
  @IsNumber()
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER) // (2^53 - 1) Inteiro máximo em JS antes de precisar se tornar um BigInt
  @ApiProperty()
  sku: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty()
  name: string;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreateProductInventoryDto)
  @ApiProperty()
  inventory: CreateProductInventoryDto;
}
