import { describe, it, expect, beforeEach, jest } from "@jest/globals"
import { MongoRepository } from "../../../../domain/repositories/Mongo.repository"
import { GetProductUseCase } from "./GetProduct.useCase"
import { StockProductService } from "../../service/StockProduct.service"
import { IProduct } from "../../../../domain/entities/products/Product"

describe('GetProductUseCase', () => {
  let getProductUseCase: GetProductUseCase
  let productService: StockProductService
  let productsRepository: MongoRepository

  beforeEach(() => {
    productsRepository = new MongoRepository()
    productService = new StockProductService()
    getProductUseCase = new GetProductUseCase(productsRepository, productService)
  })

  it('should return a product by sku', async () => {
    jest.spyOn(productsRepository, 'getProduct').mockImplementationOnce(async () => getProduct())
    const product = await getProductUseCase.execute(10231)
    expect(product).toHaveProperty('sku', 10231)
    expect(product).toHaveProperty('name', 'Zaad')
    expect(product).toHaveProperty('inventory')
    expect(product).toHaveProperty('isMarketable', true)
    expect(product.inventory).toHaveProperty('quantity', 66)
  })


})

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
    }
  }
}