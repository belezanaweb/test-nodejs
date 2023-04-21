import { describe, it, expect, beforeAll, beforeEach, jest } from "@jest/globals"
import { CreateProductUseCase } from "./CreateProduct.useCase"
import { MongoRepository } from "../../../../domain/repositories/Mongo.repository"
import { IProduct } from "../../../../domain/entities/products/Product"

describe('StockProductService', () => {
  let createProductUseCase: CreateProductUseCase
  let productsRepository: MongoRepository

  beforeEach(() => {
    productsRepository = new MongoRepository()
    createProductUseCase = new CreateProductUseCase(productsRepository)
  })

  it('should be possible create a product', async () => {
    jest.spyOn(productsRepository, 'create').mockImplementationOnce(async () => createProductRepository())
    const product = createProductRepository()
    const createProduct = await createProductUseCase.execute(product)
    expect(createProduct).toHaveBeenCalledTimes(1)
  })

  it('should be an error create a product with same sku', async () => {
    jest.spyOn(productsRepository, 'create').mockImplementationOnce(() => { throw new Error("") })
    const product = createProductRepository()
    const createProduct = await createProductUseCase.execute(product)
    expect(createProduct).rejects.toThrowError()
  })
})

function createProductRepository(): IProduct {
  return {
    sku: 10231,
    name: 'Zaad',
    inventory: {
      warehouses: [
        {
          locality: "FLORIANOPOLIS",
          quantity: 15,
          type: "PHYSICAL_STORE"
        }, {
          locality: "PR",
          quantity: 51,
          type: "PHYSICAL_STORE"
        }
      ]
    }
  }
}