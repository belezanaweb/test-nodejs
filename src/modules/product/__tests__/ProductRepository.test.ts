import { MemoryProvider } from '@infra/StorageProvider/MemoryProvider/MemoryProvider'

import { Product } from '@modules/product/schemas/ProductSchema'
import { mockProduct } from '@modules/product/schemas/__fakes__/ProductMocks'

import { ProductRepository } from '@modules/product/ProductRepository'

describe('ProductRepository', () => {
  const map = new Map<number, Product>()
  const provider = new MemoryProvider(map)

  const productRepository = new ProductRepository(provider)

  beforeEach(() => {
    map.clear()
  })

  test('should create an instance', () => {
    expect(new ProductRepository()).toBeInstanceOf(ProductRepository)
  })

  test('should create product', async () => {
    await expect(
      productRepository.saveProduct(mockProduct)
    ).resolves.not.toThrow()
  })

  test('should return `null` if product with sku does not exists', async () => {
    await expect(productRepository.getProduct(999)).resolves.toBeNull()
  })

  test('should retrieve product', async () => {
    map.set(mockProduct.sku, mockProduct)

    await expect(
      productRepository.getProduct(mockProduct.sku)
    ).resolves.toEqual(mockProduct)
  })

  test('should remove a product', async () => {
    map.set(mockProduct.sku, mockProduct)

    await expect(
      productRepository.removeProduct(mockProduct.sku)
    ).resolves.toBe(true)
  })
})
