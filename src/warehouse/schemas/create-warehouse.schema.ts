import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateWarehouseSchema {
  @IsString()
  @IsNotEmpty()
  locality: string;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsString()
  @IsNotEmpty()
  type: string;
}
