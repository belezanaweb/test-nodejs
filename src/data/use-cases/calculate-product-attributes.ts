import { IProductModel } from '@/domain/models/product-model'
import { ICalculateProductAttributes } from '@/domain/protocols/calculate-product-attributes-protocol'

export class CalculateProductAttributes implements ICalculateProductAttributes {
  async calcTotalQuantity (model: IProductModel): Promise<number> {
    const result = model.inventory.warehouses.map(item => item.quantity).reduce((acc, item) => item + acc)
    return result
  }

  async calcIsMarketable (model: IProductModel): Promise<boolean> {
    const totalQtde = model.inventory.warehouses.map(item => item.quantity).reduce((acc, item) => item + acc)
    return totalQtde > 0
  }
}
