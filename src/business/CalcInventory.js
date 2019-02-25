const path = require('path');

module.exports = class CalcInventory {

  quantity(warehouses) {
    try {
      let quantity = 0.0;
      if (warehouses instanceof Array) {
        for (let i = 0, warehouse;
          (warehouse = warehouses[i++]);) {
          if (undefined !== warehouse.quantity) {
            quantity += parseFloat(warehouse.quantity);
          }
        }
      }
      return Math.ceil(quantity);
    } catch (err) {
      throw err;
    }
  }

  isMarketable(warehouses) {
    try {
      let isMarketable = false;
      if (warehouses instanceof Array) {
        for (let i = 0, warehouse;
          (warehouse = warehouses[i++]);) {
          if ((undefined !== warehouse.quantity) && parseInt(warehouse.quantity)) {
            isMarketable = true;
            break;
          }
        }
      }
      return isMarketable;
    } catch (err) {
      throw err;
    }
  }

};
