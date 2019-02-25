const path = require('path');
const assert = require('assert');
const CalcInventory = require(path.resolve('./src/business/CalcInventory'));

describe('CalcInventory', function () {
  let inventory = new CalcInventory();
  let warehouses = new Array({
    "locality": "SP",
    "quantity": 12,
    "type": "ECOMMERCE"
  }, {
    "locality": "MOEMA",
    "quantity": 3,
    "type": "PHYSICAL_STORE"
  });
  describe('quantity', function () {
    it('There is quantity', function () {
      assert.equal(inventory.quantity(warehouses), 15);
    });
    it('There is not quantity', function () {
      assert.equal(inventory.quantity(new Array()), 0);
    });
  });
  describe('isMarketable', function () {
    it('It is Marketable', function () {
      assert.equal(inventory.isMarketable(warehouses), true);
    });
    it('It is not Marketable', function () {
      assert.equal(inventory.isMarketable(new Array()), false);
    });
  });
});
