import { describe, it, expect, beforeAll, beforeEach, jest } from "@jest/globals"
import { MongoRepository } from "../../../../domain/repositories/Mongo.repository"
import { IProduct } from "../../../../domain/entities/products/Product"
import { AppError } from "../../../../shared/excepetions/errors"
import { DeleteProductUseCase } from "./DeleteProduct.useCase"

describe('DeleteProductUseCase', () => {
  let deleteProductUseCase: DeleteProductUseCase
  let productsRepository: MongoRepository

  beforeEach(() => {
    productsRepository = new MongoRepository()
    deleteProductUseCase = new DeleteProductUseCase(productsRepository)
  })

  it('should be update isDeleted field to true', async () => {
    jest.spyOn(productsRepository, 'getProduct').mockImplementationOnce(async () => getProduct())
    jest.spyOn(productsRepository, 'delete').mockImplementationOnce(async () => deleteProductRepository())
    const deleteProduct = await deleteProductUseCase.execute(10231)
    expect(deleteProduct.isDeleted).toEqual(true)
  })

  // it('should be return error when doesnt found a product by sku', async () => {
  //   jest.spyOn(productsRepository, 'getProduct').mockImplementationOnce(async () => getProductEmpty())
  //   const deleteProduct = await deleteProductUseCase.execute(10231)
  //   await expect(deleteProduct).rejects.toBeInstanceOf(AppError)
  // })

})

function getProductEmpty() {
  return null
}

function deleteProductRepository(): IProduct {
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
    },
    isDeleted: true
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
    },
    isDeleted: false
  }
}