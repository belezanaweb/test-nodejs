import { HttpError } from 'routing-controllers';

export class ProductNotFoundError extends HttpError {
  constructor(message = 'Product not found!') {
    super(404, message);
  }
}
