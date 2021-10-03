const product = {
  getInventoryQuantity(product) {
    const quantities = product.inventory.warehouses.map((warehouse) => {
      return warehouse.quantity;
    });
    product.inventory.quantity = quantities.reduce(
      (quantity, currentValue) => quantity + currentValue
    );
    return product;
  },
  isMarketable(product) {
    product.isMarktable = product.inventory.quantity > 0 ? true : false;
    return product;
  },
};
module.exports = product;
