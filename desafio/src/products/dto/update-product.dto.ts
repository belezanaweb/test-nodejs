import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsString,
} from 'class-validator';

class Inventory {
  @IsNotEmpty()
  @IsArray()
  warehouses: Warehouses[];
}

class Warehouses {
  @IsNotEmpty()
  @IsString()
  locality: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  type: string;
}

export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsObject()
  inventory: Inventory;
}
