import Product, { ProductAttributes, InventoryAtrributes } from './../../models/product'

class ProductController {

    constructor(){
    }
    async index() {
        return await Product.findAll()
    }
    async save(data: ProductAttributes) {
      try{
        const newData = this._removeAttrs(data)
        const result = await Product.create(newData)
        const inventory: InventoryAtrributes = this._getInventory(result.getDataValue('inventory'))
        result.setDataValue('inventory', inventory)
        result.setDataValue('isMarketable', this._getIsMarketable(inventory.quantity || 0 ))
        return result
      } catch(err) {
        return false
      }
    }
    async update(sku: number | string, data: ProductAttributes) {
      try{
        const newData = this._removeAttrs(data)
        const result = await Product.update(newData, {
          where: { sku }
        })
        const inventory: InventoryAtrributes = this._getInventory(newData.inventory)
        newData.inventory = inventory
        newData.isMarketable = this._getIsMarketable(inventory.quantity || 0 )
        return result[0] ? newData : false
      } catch(err) {
        return false
      }

    }
    async find(sku: number | string): Promise<Product | null> {
      const item = await Product.findOne({ where: { sku }})
      if(item) {
        const inventory: InventoryAtrributes = this._getInventory(item.getDataValue('inventory'))
        item.setDataValue('inventory', inventory)
        item.setDataValue('isMarketable', this._getIsMarketable(inventory.quantity || 0 ))
      }
      return item
    }
    async delete(sku: number | string): Promise<number> {
      return await Product.destroy({ where: { sku }})
    }
    _removeAttrs(data: ProductAttributes){
      const newData = data
      if(data.inventory?.hasOwnProperty('quantity')) delete newData.inventory?.quantity
      if(data.hasOwnProperty('isMarketable')) delete newData.isMarketable
      return newData
    }
    _getQuantity(inventory: InventoryAtrributes){
      if(inventory) {
        return inventory?.warehouses.reduce((prev, cur) => prev + cur.quantity, 0)
      }
      return 0
    }

    _getInventory(inventory: InventoryAtrributes){
      return {
        ...inventory,
        quantity: this._getQuantity(inventory)
      }
    }

    _getIsMarketable(quantity: number) {
      return  quantity > 0
    }

}
export default ProductController
