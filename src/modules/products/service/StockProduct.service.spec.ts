import { describe, it, expect, beforeAll, beforeEach } from "@jest/globals"
import { IProduct } from "../../../domain/entities/products/Product"
import { Inventory } from "../../../domain/entities/products/interface/Inventory"
import { Warehouses } from "../../../domain/entities/products/interface/Warehouses"
import { StockProductService } from "./StockProduct.service"

describe('StockProductService', () => {
  const stockProductService = new StockProductService()

  it('should return marketable true if quantity granther then 0', async () => {
    const product = generateMongoProductWithQuantity()
    const stockProduct = await stockProductService.execute(product)
    expect(stockProduct.isMarketable).toEqual(true)
    expect(stockProduct.inventory.quantity).toEqual(66)
  })

  it('should return marketable false if quantity is equal 0', async () => {
    const product = generateMongoProductWithoutQuantity()
    const stockProduct = await stockProductService.execute(product)
    expect(stockProduct.isMarketable).toEqual(false)
    expect(stockProduct.inventory.quantity).toEqual(0)
  })
})

function generateMongoProductWithQuantity(): any {
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

function generateMongoProductWithoutQuantity(): any {
  return {
    sku: 51423,
    name: 'Malbec',
    inventory: {
      warehouses: [
        {
          locality: "PE",
          quantity: 0,
          type: "PHYSICAL_STORE"
        }, {
          locality: "SP",
          quantity: 0,
          type: "PHYSICAL_STORE"
        }
      ]
    }
  }
}