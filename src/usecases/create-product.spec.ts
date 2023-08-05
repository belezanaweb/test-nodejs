import { describe, expect, it, vi } from 'vitest'
import { CreateProduct } from './create-product'
import { ProductGateway } from '../gateway/product.interface'
import { Product } from '../domain/product'
import { InvalidParamError } from '../error'

const mockProductRepository = (): ProductGateway => {
  return {
    add: vi.fn(),
    findBySku: vi.fn(),
    update: vi.fn(),
    delete: vi.fn()
  }
}

describe('Create Product use case', () => {
  it('should save a new product', async () => {
    const fakeProductRepository = mockProductRepository()
    const sut = new CreateProduct(fakeProductRepository)
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

    await sut.execute(input)

    expect(fakeProductRepository.add).toHaveBeenCalledTimes(1)
    expect(fakeProductRepository.add).toHaveBeenCalledWith(new Product(input))
  })

  it('should throw if product already exists', async () => {
    const fakeProductRepository = mockProductRepository()
    vi.spyOn(fakeProductRepository, 'findBySku').mockImplementationOnce(() => {
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
    })
    const sut = new CreateProduct(fakeProductRepository)
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

    expect(() => sut.execute(input)).rejects.toThrow(
      new InvalidParamError('Product already exists')
    )
  })
})
