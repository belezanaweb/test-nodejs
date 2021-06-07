import "reflect-metadata"

import AppError from "@shared/errors/AppError";

import InMemoryProductsRepository from '@modules/products/infra/repositories/InMemoryProductsRepository';
import RemoveProductService from "@modules/products/services/RemoveProductService";

let fakeInMemoryProductsRepository: InMemoryProductsRepository
let removeProduct: RemoveProductService

describe('RemoveProduct', () => {
  beforeEach(() => {
    fakeInMemoryProductsRepository = new InMemoryProductsRepository()
    removeProduct = new RemoveProductService(
      fakeInMemoryProductsRepository
    )
  })

  it('should be able to remove a product', async () => {
    const sku = 123;
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

    await removeProduct.execute({ sku })

    const findProduct = await fakeInMemoryProductsRepository.findBySku(sku)

    expect(findProduct).toBeFalsy()
  })

  it('should not be able to remove product from non-existing sku', () => {
    const sku = 123
    expect(removeProduct.execute({ sku })).rejects.toBeInstanceOf(AppError)
  });
})
