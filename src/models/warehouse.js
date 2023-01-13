module.exports = class Warehouse {
  constructor(warehouse) {
    this.locality = warehouse.locality;
    this.quantity = warehouse.quantity;
    this.type = warehouse.type;
  }
};
