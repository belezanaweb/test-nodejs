const path = require('path');
const Inventory = require(path.resolve('./src/entity/Inventory'));

module.exports = class Product {

  constructor() {
    this._payload = new Object({
      'sku': '',
      'name': '',
      'inventory': ''
    });
    Object.freeze(this);
  }

  validate(data) {
    try {
      let valid = true;
      for (let key in data) {
        if (undefined === this._payload[key]) {
          valid = false;
          break;
        }
      }
      return valid ? (new Inventory()).validate(data) : valid;
    } catch (err) {
      throw err;
    }
  }

}
