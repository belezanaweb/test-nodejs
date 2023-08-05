import { Product } from '../domain/product'
import { ProductGateway } from '../gateway/product.interface'

export class ProductRepositoryFake implements ProductGateway {
  private _products: Product[] = []

  constructor() {
    if (this._products.length === 0) {
      this._products = []
    }
  }

  async add(product: Product): Promise<void> {
    this._products.push(product)
  }

  async findBySku(sku: number): Promise<Product | undefined> {
    const product = this._products.find((product) => product.sku === sku)
    return product
  }

  async update(product: Product): Promise<Product> {
    const productIndex = this._products.findIndex(
      (product) => product.sku === product.sku
    )
    this._products[productIndex] = product
    return product
  }

  async delete(sku: number): Promise<void> {
    const productIndex = this._products.findIndex(
      (product) => product.sku === sku
    )
    this._products.splice(productIndex, 1)
  }
}
