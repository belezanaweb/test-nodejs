import { describe, it, expect, beforeAll, beforeEach } from "@jest/globals"
import { IProduct } from "../../../entities/products/Product"
import { Inventory } from "../../../entities/products/interface/Inventory"
import { Warehouses } from "../../../entities/products/interface/Warehouses"
import { StockProductService } from "./StockProduct.service"

describe('StockProductService', () => {
  let product: IProduct
  let inventory: Inventory
  let warehouses: Array<Warehouses>
  const stockProductService = new StockProductService()

  beforeEach(() => {
    warehouses = [{
      locality: "FLORIANOPOLIS",
      quantity: 15,
      type: "PHYSICAL_STORE"
    }, {
      locality: "PR",
      quantity: 51,
      type: "PHYSICAL_STORE"
    }]
    inventory = { warehouses: warehouses }
    product = new IProduct({ sku: 10231, name: 'Zaad', inventory: inventory })
  })

  it('should return marketable true if quantity granther then 0', async () => {
    const stockProduct = await stockProductService.execute(product)
    expect(stockProduct.isMarketable).toEqual(true)
    expect(stockProduct.inventory.quantity).toEqual(66)
  })

  it('should return marketable false if quantity is equal 0', async () => {
    warehouses = [{
      locality: "CURITIBA",
      quantity: 0,
      type: "PHYSICAL_STORE"
    }, {
      locality: "SP",
      quantity: 0,
      type: "PHYSICAL_STORE"
    }]
    inventory = { warehouses: warehouses }
    product = new IProduct({ sku: 51423, name: 'Malbec', inventory: inventory})
    const stockProduct = await stockProductService.execute(product)
    expect(stockProduct.isMarketable).toEqual(false)
  })
})