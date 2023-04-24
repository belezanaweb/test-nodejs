import { IStorageProvider } from '@infra/StorageProvider/types'
import { MemoryProvider } from '@infra/StorageProvider/MemoryProvider/MemoryProvider'

import { Product } from '@modules/product/schemas/ProductSchema'

export class ProductRepository {
  constructor(
    private storageProvider: IStorageProvider<
      number,
      Product
    > = new MemoryProvider()
  ) {}

  async getProduct(sku: number): Promise<Product | null> {
    return await this.storageProvider.get(sku)
  }

  async saveProduct(product: Product): Promise<void> {
    return await this.storageProvider.save(product.sku, product)
  }

  async removeProduct(sku: number): Promise<boolean> {
    return await this.storageProvider.remove(sku)
  }
}
