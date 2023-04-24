export class ProductNotFoundError extends Error {
  constructor(sku: number) {
    super(`Product with SKU ${sku} does not exists`)
  }
}
