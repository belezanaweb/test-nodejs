import { FastifyInstance } from 'fastify'

import { buildInstance } from '@root/app'

import {
  mockDisplayProduct,
  mockProduct,
} from '@modules/product/schemas/__fakes__/ProductMocks'

import { ProductService } from '@modules/product/ProductService'
import { ProductNotFoundError } from '@modules/product/exceptions/ProductNotFoundError'

describe('GetProductBySKU', () => {
  let server: FastifyInstance

  let spyGetProduct = jest.spyOn(ProductService.prototype, 'getProduct')

  const getProduct = () =>
    server.inject({
      method: 'GET',
      url: `/products/${mockProduct.sku}`,
    })

  beforeEach(() => {
    server = buildInstance()

    spyGetProduct.mockResolvedValue(mockDisplayProduct)
  })

  afterEach(() => {
    server.close()
  })

  test('should retrieve product', async () => {
    const response = await getProduct()

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual(mockDisplayProduct)
  })

  test('should return status 404 if product could not be found', async () => {
    spyGetProduct.mockRejectedValueOnce(
      new ProductNotFoundError(mockProduct.sku)
    )

    const response = await getProduct()

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
    spyGetProduct.mockRejectedValueOnce(new Error('something went wrong'))

    const response = await getProduct()

    expect(response.statusCode).toBe(500)
    expect(response.json()).toEqual({
      error: 'Internal Server Error',
      status: 500,
    })
  })
})
