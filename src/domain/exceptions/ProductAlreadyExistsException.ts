export default class ProductAlreadyExistsException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ProductAlreadyExistsException";
  }
}
