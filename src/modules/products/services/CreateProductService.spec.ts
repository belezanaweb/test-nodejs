import "reflect-metadata"

import InMemoryProductsRepository from '@modules/products/infra/repositories/InMemoryProductsRepository';
import CreateProductService from '@modules/products/services/CreateProductService';

let fakeInMemoryProductsRepository: InMemoryProductsRepository
let createProduct: CreateProductService

describe('CreateProduct', () => {
  beforeEach(() => {
    fakeInMemoryProductsRepository = new InMemoryProductsRepository()
    createProduct = new CreateProductService(
      fakeInMemoryProductsRepository
    )
  })

  it('should be able to create a new product', async () => {
    const product = await createProduct.execute({
      sku: 123,
      name: 'sample product',
      inventory: {
        warehouses: [{
          locality: 'sample locality',
          quantity: 10,
          type: 'ECOMMERCE'
        }]
      }
    })

    expect(product.sku).toBe(123)
  })

  it('should be not able to create a new product with same sku', async () => {
    await createProduct.execute({
      sku: 123,
      name: 'sample product',
      inventory: {
        warehouses: [{
          locality: 'sample locality',
          quantity: 10,
          type: 'ECOMMERCE'
        }]
      }
    })

    await expect(createProduct.execute({
      sku: 123,
      name: 'sample product',
      inventory: {
        warehouses: [{
          locality: 'sample locality',
          quantity: 10,
          type: 'ECOMMERCE'
        }]
      }
    })).rejects.toBeInstanceOf(Error)
  })
})
