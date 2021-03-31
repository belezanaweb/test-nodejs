import { IsNotEmpty } from 'class-validator';

export default class CreateProductDto {
  @IsNotEmpty()
  sku: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  inventory: {
    warehouses: {
      locality: string;
      quantity: number;
      type: string;
    }[];
  };
}
