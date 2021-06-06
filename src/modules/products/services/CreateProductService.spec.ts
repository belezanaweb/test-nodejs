import "reflect-metadata"

import InMemoryProductsRepository from '../infra/repositories/InMemoryProductsRepository';
import CreateProductService from './CreateProductService';

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
})
