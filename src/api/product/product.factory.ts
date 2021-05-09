import { ProductController } from './product.controller';
import { ProductError } from './product.error';
import { ProductService } from './product.service';

export const makeProductController = () => {
  const productError = new ProductError();
  const productService = new ProductService(productError);
  return new ProductController(productService);
}
