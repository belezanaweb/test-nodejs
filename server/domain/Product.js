const Product = {
  getProduct(product) {
    return {
      ...product,
      inventory: Product.getInventory(product.inventory),
      isMarketable: Product.getIsMarketable(product.inventory)
    }
  },
  getInventory(inventory = {}) {
    let wh = inventory.warehouses || []

    inventory.quantity = wh.reduce((p,c) => p += c.quantity, 0)
    return inventory
  },
  getIsMarketable(inventory = {}) {
    return inventory.quantity > 0
  }
}

module.exports = Product
