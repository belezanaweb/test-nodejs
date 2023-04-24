import { FastifyInstance } from 'fastify'

import { buildInstance } from '@root/app'

import {
  mockDisplayProduct,
  mockProduct,
} from '@modules/product/schemas/__fakes__/ProductMocks'
import { DuplicatedProductError } from '@modules/product/exceptions/DuplicatedProductError'
import { ProductService } from '@modules/product/ProductService'

describe('CreateProduct', () => {
  let server: FastifyInstance
  let spyCreateProduct = jest.spyOn(ProductService.prototype, 'createProduct')

  const createProduct = () =>
    server.inject({
      method: 'POST',
      url: '/products',
      payload: mockProduct,
    })

  beforeEach(() => {
    server = buildInstance()

    spyCreateProduct.mockResolvedValue(mockDisplayProduct)
  })

  afterEach(() => {
    server.close()
  })

  test('should create product', async () => {
    const response = await createProduct()

    expect(response.statusCode).toBe(201)
    expect(response.json()).toEqual(mockDisplayProduct)
  })

  test('should return status 409 if sku is duplicated', async () => {
    spyCreateProduct.mockRejectedValueOnce(
      new DuplicatedProductError(mockProduct.sku)
    )

    const response = await createProduct()

    expect(response.statusCode).toBe(409)
    expect(response.json()).toEqual(
      expect.objectContaining({
        error: 'Conflict',
        message: expect.any(String),
        status: 409,
      })
    )
  })

  test('should return status 500 if ProductService throws', async () => {
    spyCreateProduct.mockRejectedValueOnce(new Error('something went wrong'))

    const response = await createProduct()

    expect(response.statusCode).toBe(500)
    expect(response.json()).toEqual({
      error: 'Internal Server Error',
      status: 500,
    })
  })
})
