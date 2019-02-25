module.exports = class Warehouse {

  constructor() {
    this._payload = new Object({
      'locality': '',
      'quantity': '',
      'type': ''
    });
    Object.freeze(this);
  }

  validate(data) {
    try {
      let valid = true;
      if (data.inventory.warehouses instanceof Array) {
        for (let i in data.inventory.warehouses) {
          if (!valid) break;
          for (let key in data.inventory.warehouses[i]) {
            if (undefined === this._payload[key]) {
              valid = false;
              break;
            }
          }
        }
      } else {
        valid = false;
      }
      return valid;
    } catch (err) {
      throw err;
    }
  }

}
