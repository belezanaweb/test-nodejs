import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from '../product.repository';

@Injectable()
export default class ValidateUpdate implements PipeTransform {
  constructor(private readonly repository: ProductRepository) {}
  async transform(
    value: number,
    metadata: ArgumentMetadata,
  ): Promise<number | void> {
    if (metadata.type !== 'param') return value;
    const valid = this.repository.findOne(value);

    if (!valid) throw new NotFoundException('Invalid sku');
    return value;
  }
}
