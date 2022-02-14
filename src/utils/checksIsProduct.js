
module.exports = function checksIsProduct(product) {
    var total = product.inventory.warehouses.reduce((total,item) => {return total + (item.quantity)}, 0 )
  
    product.inventory.quantity = total
  
  
    return {
      ...product,
      isMarketable: total > 0 ? true : false
    }
  }