import { describe, it, expect, beforeAll } from "@jest/globals"
import { IProduct } from "./Product"
import { Inventory } from "./interface/Inventory"
import { Warehouses } from "./interface/Warehouses"

describe('Product', () => {
  let product: IProduct
  let inventory: Inventory
  let warehouses: Array<Warehouses>

  beforeAll(() => {
    warehouses = [{
        locality: "Florianopolis",
        quantity: 15,
        type: "PHYSICAL_STORE"
      }, {
        locality: "PR",
        quantity: 51,
        type: "PHYSICAL_STORE"
      }]
      inventory = { warehouses: warehouses }
    product = new IProduct({ sku: 10231, name: 'Zaad', inventory: inventory})
  })

  it('should be able create a new product', () => {
    expect(product).toBeInstanceOf(IProduct)
    expect(product.sku).toEqual(10231)
    expect(product.name).toEqual('Zaad')
    expect(product.inventory).toEqual(inventory)
  })
})