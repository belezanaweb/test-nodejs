import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsPositive,
  IsString,
  ValidateNested,
  isString,
} from "class-validator";
import { ProductWarehouseType } from "../enum/ProductWarehouseType.enum";
import { Type } from "class-transformer";

export class ProductInventoryWarehouses {
  @ApiProperty()
  @IsString()
  locality: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsEnum(ProductWarehouseType)
  type: ProductWarehouseType;
}

export class ProductInventoriesRequest {
  @ApiProperty()
  @IsDefined()
  @ValidateNested()
  @Type(() => Array<ProductInventoryWarehouses>)
  warehouses: ProductInventoryWarehouses[];
}

export class ProductRequest {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  sku: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => ProductInventoriesRequest)
  inventory: ProductInventoriesRequest;
}
