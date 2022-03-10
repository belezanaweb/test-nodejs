import { IsOptional } from 'class-validator';
import { CreateProductSchema } from './create-product.schema';

export class EditProductSchema extends CreateProductSchema {
  @IsOptional()
  sku: number;
}
