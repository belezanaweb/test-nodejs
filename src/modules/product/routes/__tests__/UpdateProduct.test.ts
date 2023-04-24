import { FastifyInstance } from 'fastify'

import { buildInstance } from '@root/app'

import {
  mockDisplayProduct,
  mockProduct,
} from '@modules/product/schemas/__fakes__/ProductMocks'
import { ProductService } from '@modules/product/ProductService'
import { ProductNotFoundError } from '@modules/product/exceptions/ProductNotFoundError'

describe('UpdateProduct', () => {
  let server: FastifyInstance

  const spyUpdateProduct = jest.spyOn(ProductService.prototype, 'updateProduct')

  const update = () =>
    server.inject({
      method: 'PUT',
      url: '/products/:sku',
      payload: mockProduct,
    })

  beforeEach(() => {
    server = buildInstance()

    spyUpdateProduct.mockResolvedValue(mockDisplayProduct)
  })

  afterEach(() => {
    server.close()
  })

  test('should update product', async () => {
    const response = await update()

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual(mockDisplayProduct)
  })

  test('should return 404 if product is not found', async () => {
    spyUpdateProduct.mockRejectedValue(
      new ProductNotFoundError(mockProduct.sku)
    )

    const response = await update()

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
    spyUpdateProduct.mockRejectedValueOnce(new Error('something went wrong'))

    const response = await update()

    expect(response.statusCode).toBe(500)
    expect(response.json()).toEqual({
      error: 'Internal Server Error',
      status: 500,
    })
  })
})
