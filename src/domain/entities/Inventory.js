const { attributes } = require('structure');
const Warehouse = require('./Warehouse');

const Inventory = attributes({
  quantity: Number,
  warehouses: {
    type: Array,
    itemType: Warehouse
  }
});
module.exports = Inventory;
