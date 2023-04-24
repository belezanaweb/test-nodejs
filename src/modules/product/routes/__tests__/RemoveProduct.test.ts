import { FastifyInstance } from 'fastify'

import { buildInstance } from '@root/app'

import { ProductNotFoundError } from '@modules/product/exceptions/ProductNotFoundError'
import { ProductService } from '@modules/product/ProductService'
import { mockProduct } from '@modules/product/schemas/__fakes__/ProductMocks'

describe('RemoveProduct', () => {
  let server: FastifyInstance

  let spyRemoveProduct = jest.spyOn(ProductService.prototype, 'removeProduct')

  const removeProduct = () =>
    server.inject({
      method: 'DELETE',
      url: `/products/${mockProduct.sku}`,
    })

  beforeEach(() => {
    server = buildInstance()

    spyRemoveProduct.mockResolvedValue()
  })

  afterEach(() => {
    server.close()
  })

  test('should remove product', async () => {
    const response = await removeProduct()

    expect(response.statusCode).toBe(204)
    expect(response.body).toEqual('')
  })

  test('should return status 404 if product could not be found', async () => {
    spyRemoveProduct.mockRejectedValueOnce(
      new ProductNotFoundError(mockProduct.sku)
    )

    const response = await removeProduct()

    expect(response.statusCode).toBe(404)
    expect(response.json()).toEqual(
      expect.objectContaining({
        error: 'Not Found',
        message: expect.any(String),
        status: 404,
      })
    )
  })

  test('should return status 500 if ProductService throws', async () => {
    spyRemoveProduct.mockRejectedValueOnce(new Error('something went wrong'))

    const response = await removeProduct()

    expect(response.statusCode).toBe(500)
    expect(response.json()).toEqual({
      error: 'Internal Server Error',
      status: 500,
    })
  })
})
