import "reflect-metadata"

import InMemoryProductsRepository from '@modules/products/infra/repositories/InMemoryProductsRepository';
import UpdateProductService from "@modules/products/services/UpdateProductService";

let fakeInMemoryProductsRepository: InMemoryProductsRepository
let updateProduct: UpdateProductService

describe('UpdateProduct', () => {
  beforeEach(() => {
    fakeInMemoryProductsRepository = new InMemoryProductsRepository()
    updateProduct = new UpdateProductService(
      fakeInMemoryProductsRepository
    )
  })

  it('should be able to find a product by sku', async () => {
    const sku = 123

    const product = await fakeInMemoryProductsRepository.create({
      sku,
      name: 'sample product',
      inventory: {
        warehouses: [{
          locality: 'sample locality',
          quantity: 10,
          type: 'ECOMMERCE'
        }]
      }
    })

    const updatedProduct = await updateProduct.execute({
      sku,
      name: 'update sample product',
      inventory: {
        warehouses: [{
          locality: 'sample locality',
          quantity: 10,
          type: 'ECOMMERCE'
        },
        {
          locality: 'sample locality 2',
          quantity: 20,
          type: 'ECOMMERCE'
        }]
      }
    })

    expect(updatedProduct.sku).toBe(123)
    expect(updatedProduct.name).toBe('update sample product')
    expect(updatedProduct.inventory.warehouses.length).toBe(2)
  })

  it('should not be able to update product from non-existing sku', async () => {
    expect(
      updateProduct.execute({
        sku: 123,
        name: 'update sample product',
        inventory: {
          warehouses: [{
            locality: 'sample locality',
            quantity: 10,
            type: 'ECOMMERCE'
          }]
        }
      }),
    ).rejects.toBeInstanceOf(Error);
  });
})
