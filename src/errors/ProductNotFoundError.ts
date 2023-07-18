import ApplicationError from "./ApplicationError";

export default class ProductNotFoundError extends ApplicationError {
  constructor(sku: number) {
    super(`Product with SKU ${sku} not found`);
  }
}
