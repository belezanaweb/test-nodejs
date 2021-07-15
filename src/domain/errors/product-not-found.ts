export class ProductNotFoundError extends Error {
  constructor () {
    super('Product not found')
    this.name = 'ProductNotFoundError'
  }
}
