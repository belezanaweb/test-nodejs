import { describe, expect, it, vi } from 'vitest'
import { UpdateProduct } from './update-product'
import { ProductGateway } from '../gateway/product.interface'
import { Product } from '../domain/product'
import { NotFoundError } from '../error'

const mockProductRepository = (): ProductGateway => {
  return {
    add: vi.fn(),
    findBySku: vi.fn(() => {
      return Promise.resolve(
        new Product({
          sku: 123,
          name: 'Test Product',
          inventory: {
            warehouses: [
              {
                locality: 'Test Locality',
                quantity: 10,
                type: 'ECOMMERCE'
              }
            ]
          }
        })
      )
    }),
    update: vi.fn(() => {
      return Promise.resolve(
        new Product({
          sku: 123,
          name: 'Test Product Updated',
          inventory: {
            warehouses: [
              {
                locality: 'Test Locality Updated',
                quantity: 100,
                type: 'NEW'
              }
            ]
          }
        })
      )
    }),
    delete: vi.fn()
  }
}

describe('Update Product use case', () => {
  it('should update a product', async () => {
    const fakeProductRepository = mockProductRepository()
    const sut = new UpdateProduct(fakeProductRepository)
    const input = {
      sku: 123,
      name: 'Test Product',
      inventory: {
        warehouses: [
          {
            locality: 'Test Locality',
            quantity: 10,
            type: 'ECOMMERCE'
          }
        ]
      }
    }

    const updatedProduct = await sut.execute(input)

    expect(fakeProductRepository.findBySku).toHaveBeenCalledTimes(1)
    expect(fakeProductRepository.findBySku).toHaveBeenCalledWith(123)
    expect(fakeProductRepository.update).toHaveBeenCalledTimes(1)
    expect(fakeProductRepository.update).toHaveBeenCalledWith(
      new Product(input)
    )
    expect(updatedProduct.name).toBe('Test Product Updated')
    expect(updatedProduct.inventory.warehouses[0].locality).toBe(
      'Test Locality Updated'
    )
    expect(updatedProduct.inventory.warehouses[0].quantity).toBe(100)
    expect(updatedProduct.inventory.warehouses[0].type).toBe('NEW')
  })

  it('should throw if product was not found', async () => {
    const fakeProductRepository = mockProductRepository()
    vi.spyOn(fakeProductRepository, 'findBySku').mockImplementationOnce(() => {
      return Promise.resolve(undefined)
    })
    const sut = new UpdateProduct(fakeProductRepository)
    const input = {
      sku: 123,
      name: 'Test Product',
      inventory: {
        warehouses: [
          {
            locality: 'Test Locality',
            quantity: 10,
            type: 'ECOMMERCE'
          }
        ]
      }
    }

    expect(() => sut.execute(input)).rejects.toThrow(new NotFoundError())
  })
})
