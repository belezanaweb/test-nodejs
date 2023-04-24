import { Product } from '@modules/product/schemas/ProductSchema'

import { DuplicatedProductError } from '@modules/product/exceptions/DuplicatedProductError'
import { ProductNotFoundError } from '@modules/product/exceptions/ProductNotFoundError'

import { ProductRepository } from '@modules/product/ProductRepository'
import {
  DisplayProduct,
  DisplayProductSchema,
} from '@modules/product/schemas/DisplayProductSchema'

export class ProductService {
  constructor(private productRepository = new ProductRepository()) {}

  public async getProduct(sku: number): Promise<DisplayProduct> {
    const product = await this.productRepository.getProduct(sku)

    if (!product) {
      throw new ProductNotFoundError(sku)
    }

    return this.parseToDisplayProduct(product)
  }

  public async createProduct(product: Product): Promise<DisplayProduct> {
    if (await this.productExists(product.sku)) {
      throw new DuplicatedProductError(product.sku)
    }

    await this.productRepository.saveProduct(product)

    return this.parseToDisplayProduct(product)
  }

  public async updateProduct(
    sku: number,
    product: Product
  ): Promise<DisplayProduct> {
    if (sku !== product.sku || !(await this.productExists(product.sku))) {
      throw new ProductNotFoundError(product.sku)
    }

    await this.productRepository.saveProduct(product)

    return this.parseToDisplayProduct(product)
  }

  public async removeProduct(sku: number): Promise<void> {
    const removed = await this.productRepository.removeProduct(sku)

    if (!removed) {
      throw new ProductNotFoundError(sku)
    }
  }

  private async productExists(sku: number): Promise<boolean> {
    const product = await this.productRepository.getProduct(sku)

    return product !== null
  }

  private parseToDisplayProduct(product: Product): DisplayProduct {
    const displayProduct = DisplayProductSchema.parse(product)

    for (const warehouse of displayProduct.inventory.warehouses) {
      displayProduct.inventory.quantity += warehouse.quantity
    }

    displayProduct.isMarketable = displayProduct.inventory.quantity > 0

    return displayProduct
  }
}
