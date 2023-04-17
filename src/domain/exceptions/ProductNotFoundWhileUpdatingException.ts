export default class ProductNotFoundWhileUpdatingException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ProductNotFoundWhileUpdatingException";
  }
}
