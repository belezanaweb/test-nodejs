import { describe, expect, it, vi } from 'vitest'
import { DeleteProduct } from './delete-product'
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

describe('Delete Product use case', () => {
  it('should delete a product', async () => {
    const fakeProductRepository = mockProductRepository()
    const sut = new DeleteProduct(fakeProductRepository)

    await sut.execute({
      sku: 123
    })

    expect(fakeProductRepository.findBySku).toHaveBeenCalledTimes(1)
    expect(fakeProductRepository.findBySku).toHaveBeenCalledWith(123)
    expect(fakeProductRepository.delete).toHaveBeenCalledTimes(1)
    expect(fakeProductRepository.delete).toHaveBeenCalledWith(123)
  })

  it('should throw if product was not found', async () => {
    const fakeProductRepository = mockProductRepository()
    vi.spyOn(fakeProductRepository, 'findBySku').mockImplementationOnce(() => {
      return Promise.resolve(undefined)
    })
    const sut = new DeleteProduct(fakeProductRepository)

    expect(() => sut.execute({ sku: 123 })).rejects.toThrow(new NotFoundError())
  })
})
