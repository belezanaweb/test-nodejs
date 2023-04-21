import { describe, it, expect, beforeAll, beforeEach, jest } from "@jest/globals"
import { CreateProductUseCase } from "./CreateProduct.useCase"
import { MongoRepository } from "../../../../domain/repositories/Mongo.repository"
import { IProduct } from "../../../../domain/entities/products/Product"
import { AppError } from "../../../../shared/excepetions/errors"

describe('CreateProductUseCase', () => {
  let createProductUseCase: CreateProductUseCase
  let productsRepository: MongoRepository

  beforeEach(() => {
    productsRepository = new MongoRepository()
    createProductUseCase = new CreateProductUseCase(productsRepository)
  })

  it('should be possible create a product', async () => {
    jest.spyOn(productsRepository, 'getProduct').mockImplementationOnce(async () => getProductEmpty())
    jest.spyOn(productsRepository, 'create').mockImplementationOnce(async () => createProductRepository())
    const product = createProductRepository()
    const createProduct = await createProductUseCase.execute(product)
    expect(createProduct).toBe(void(0))
  })

  // it('should be an error create a product with same sku', async () => {
  //   jest.spyOn(productsRepository, 'getProduct').mockImplementationOnce(async () => getProduct())
  //   const product = createProductRepository()
  //   const createProduct = await createProductUseCase.execute(product)
  //   await expect(createProduct).rejects.toBeInstanceOf(AppError)
  // })
})

function getProductEmpty() {
  return null
}

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

function getProduct() {
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