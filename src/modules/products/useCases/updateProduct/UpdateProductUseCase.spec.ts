import { describe, it, expect, beforeAll, beforeEach, jest } from "@jest/globals"
import { MongoRepository } from "../../../../domain/repositories/Mongo.repository"
import { IProduct } from "../../../../domain/entities/products/Product"
import { UpdateProductUseCase } from "./UpdateProduct.useCase"
import { IUpdateProductDTO } from "../../dtos/IUpdateProductDTO"

describe('UpdateProductUseCase', () => {
  let updateProductUseCase: UpdateProductUseCase
  let productsRepository: MongoRepository

  beforeEach(() => {
    productsRepository = new MongoRepository()
    updateProductUseCase = new UpdateProductUseCase(productsRepository)
  })

  it('should update product', async () => {
    jest.spyOn(productsRepository, 'getProduct').mockImplementationOnce(async () => getProduct())
    jest.spyOn(productsRepository, 'update').mockImplementationOnce(async () => newProductUpdate())
    const newInfo = newInfoForUpdate()
    const updateProduct = await updateProductUseCase.execute(10231, newInfo)
    expect(updateProduct.name).toEqual('Zaad - Mondo')
    expect(updateProduct.inventory.warehouses[0].locality).toEqual('ALAGOAS')
    expect(updateProduct.inventory.warehouses[1].locality).toEqual('SERGIPE')
    expect(updateProduct.inventory.warehouses[0].quantity).toEqual(2)
    expect(updateProduct.inventory.warehouses[1].quantity).toEqual(11)
    expect(updateProduct.name).toEqual('Zaad - Mondo')
  })

})

function newProductUpdate(): IProduct {
  return {
    sku: 10231,
    name: 'Zaad - Mondo',
    inventory: {
      warehouses: [
        {
          locality: "ALAGOAS",
          quantity: 2,
          type: "PHYSICAL_STORE"
        }, {
          locality: "SERGIPE",
          quantity: 11,
          type: "PHYSICAL_STORE"
        }
      ]
    }
  }
}

function newInfoForUpdate(): IUpdateProductDTO {
  return {
    name: 'Zaad - Mondo',
    inventory: {
      warehouses: [
        {
          locality: "ALAGOAS",
          quantity: 2,
          type: "PHYSICAL_STORE"
        }, {
          locality: "SERGIPE",
          quantity: 11,
          type: "PHYSICAL_STORE"
        }
      ]
    }
  }
}

function getProduct(): IProduct {
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