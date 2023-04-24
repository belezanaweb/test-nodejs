import { MemoryProvider } from '@infra/StorageProvider/MemoryProvider/MemoryProvider'

import { DuplicatedProductError } from '@modules/product/exceptions/DuplicatedProductError'
import { Product, ProductSchema } from '@modules/product/schemas/ProductSchema'
import { ProductNotFoundError } from '@modules/product/exceptions/ProductNotFoundError'
import { ProductRepository } from '@modules/product/ProductRepository'

import {
  mockDisplayProduct,
  mockProduct,
} from '@modules/product/schemas/__fakes__/ProductMocks'

import { ProductService } from '@modules/product/ProductService'

describe('ProductService', () => {
  const map = new Map<number, Product>()
  const provider = new MemoryProvider(map)
  const repository = new ProductRepository(provider)

  const productService = new ProductService(repository)

  beforeEach(() => {
    map.clear()
  })

  test('should create an instance', () => {
    expect(new ProductService()).toBeInstanceOf(ProductService)
  })

  test('should throw ProductNotFoundError if product does not exists', async () => {
    await expect(productService.getProduct(999)).rejects.toThrowError(
      ProductNotFoundError
    )
  })

  test('should get product', async () => {
    map.set(mockProduct.sku, mockProduct)

    const product = await productService.getProduct(mockProduct.sku)

    expect(product).toEqual(mockDisplayProduct)
  })

  test('should create product', async () => {
    const createdProduct = await productService.createProduct(mockProduct)

    expect(createdProduct).toEqual(mockDisplayProduct)
    expect(map.get(mockProduct.sku)).toEqual(mockProduct)
  })

  test('should throw DuplicatedProductError if sku already exists', async () => {
    map.set(mockProduct.sku, mockProduct)

    await expect(
      productService.createProduct(mockProduct)
    ).rejects.toThrowError(DuplicatedProductError)
  })

  test('should throw ProductNotFoundError if product does not exists', async () => {
    await expect(
      productService.updateProduct(mockProduct.sku, mockProduct)
    ).rejects.toThrow(ProductNotFoundError)
  })

  test('should throw ProductNotFoundError if sku is not the same as the product sku', async () => {
    map.set(mockProduct.sku, mockProduct)

    await expect(
      productService.updateProduct(999, mockProduct)
    ).rejects.toThrow(ProductNotFoundError)
  })

  test('should update existing product', async () => {
    map.set(mockProduct.sku, mockProduct)

    const productToUpdate = ProductSchema.parse({
      ...mockProduct,
      name: 'Kit La Roche-Posay Power Hidratação Duo (2 Produtos)',
    })

    const updatedProduct = await productService.updateProduct(
      productToUpdate.sku,
      productToUpdate
    )

    expect(updatedProduct).toEqual({
      ...mockDisplayProduct,
      name: 'Kit La Roche-Posay Power Hidratação Duo (2 Produtos)',
    })
  })

  test('should return ProductNotFoundError if product could be found', async () => {
    await expect(productService.removeProduct(999)).rejects.toThrowError(
      ProductNotFoundError
    )
  })

  test('should remove a product', async () => {
    map.set(mockProduct.sku, mockProduct)

    await expect(
      productService.removeProduct(mockProduct.sku)
    ).resolves.not.toThrow()
  })
})
