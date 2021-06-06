import "reflect-metadata"

import InMemoryProductsRepository from '../infra/repositories/InMemoryProductsRepository';
import ShowProductService from "./ShowProductService";

let fakeInMemoryProductsRepository: InMemoryProductsRepository
let showProduct: ShowProductService

describe('ShowProduct', () => {
  beforeEach(() => {
    fakeInMemoryProductsRepository = new InMemoryProductsRepository()
    showProduct = new ShowProductService(
      fakeInMemoryProductsRepository
    )
  })

  it('should be able to find a product by sku', async () => {
    const sku = 123

    await fakeInMemoryProductsRepository.create({
      sku,
      name: 'sample product',
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

    const findProduct = await showProduct.execute({ sku })

    expect(findProduct.sku).toBe(123)
    expect(findProduct.inventory.warehouses.length).toBe(2)
  })

  it('should not be able to find product from non-existing sku', async () => {
    expect(
      showProduct.execute({
        sku: 123,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
})
