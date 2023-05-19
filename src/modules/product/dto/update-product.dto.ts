import { OmitType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends OmitType(CreateProductDto, [
  'sku',
] as const) {}
