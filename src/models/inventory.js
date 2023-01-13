const Warehouse = require("./warehouse");

module.exports = class Inventory {
  constructor(inventory = []) {
    const warehouses = [];

    for (let index = 0; index < inventory.warehouses.length; index++) {
      const warehouse = new Warehouse(inventory.warehouses[index]);
      warehouses[index] = warehouse;
    }

    this.warehouses = warehouses;
  }
};
