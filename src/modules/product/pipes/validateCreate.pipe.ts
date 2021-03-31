import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  ImATeapotException,
} from '@nestjs/common';
import CreateProductDto from '../dto/create.product.dto';
import { ProductRepository } from '../product.repository';

@Injectable()
export default class ValidateCreate implements PipeTransform {
  constructor(private readonly repository: ProductRepository) {}
  async transform(
    value: CreateProductDto,
    metadata: ArgumentMetadata,
  ): Promise<CreateProductDto | void> {
    if (metadata.type !== 'body') return value;
    const { sku } = value;
    const invalid = this.repository.findOne(sku);

    if (invalid)
      throw new ImATeapotException(
        "You can't create a product with this sku. (418) I'm a teapot indicates that the server refuses to prepare coffee because it is a teapot. This error is a reference to the Hyper Text Coffee Pot Control Protocol, which was a joke on April 1, 1998. I decided to place this exception due to the coincidence between the test delivery date and the day the joke was made!",
      );
    return value;
  }
}
