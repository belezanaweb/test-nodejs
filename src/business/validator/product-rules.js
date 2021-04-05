const Validator = require('./validator')

module.exports = class ProductRules {
  async do(data) {
      const rules = {
        "sku": "required|integer",
        "name": "required|string",
        "inventory.warehouses": "required|array",
        "inventory.warehouses.*.locality": "required|string",
        "inventory.warehouses.*.quantity": "required|integer",
        "inventory.warehouses.*.type": "required|string",
      };
    await (new Validator()).do(data, rules);
  }
}
