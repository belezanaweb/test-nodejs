import { describe, expect, it, vi } from 'vitest'
import { GetProductBySku } from './get-product-by-sku'
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
    update: vi.fn(),
    delete: vi.fn()
  }
}

describe('Get Product By SKU use case', () => {
  it('should return a product', async () => {
    const fakeProductRepository = mockProductRepository()
    const sut = new GetProductBySku(fakeProductRepository)

    await sut.execute(123)

    expect(fakeProductRepository.findBySku).toHaveBeenCalledTimes(1)
    expect(fakeProductRepository.findBySku).toHaveBeenCalledWith(123)
  })

  it('should throw if product was not found', async () => {
    const fakeProductRepository = mockProductRepository()
    vi.spyOn(fakeProductRepository, 'findBySku').mockImplementationOnce(() => {
      return Promise.resolve(undefined)
    })
    const sut = new GetProductBySku(fakeProductRepository)

    expect(() => sut.execute(123)).rejects.toThrow(new NotFoundError())
  })
})
