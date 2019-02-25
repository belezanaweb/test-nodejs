const path = require('path');
const Warehouse = require(path.resolve('./src/entity/Warehouse'));

module.exports = class Inventory {

  validate(data) {
    try {
      return (data.inventory instanceof Object) ? (new Warehouse()).validate(data) : false;
    } catch (err) {
      throw err;
    }
  }

}
