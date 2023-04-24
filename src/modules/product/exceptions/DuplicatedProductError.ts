export class DuplicatedProductError extends Error {
  constructor(sku: number) {
    super(`Product with SKU ${sku} already exists`)
  }
}
