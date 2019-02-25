const path = require('path');
const Warehouse = require(path.resolve('./src/model/Warehouse'));

module.exports = class DisableWarehouse {

  disableByProductId(database, product_id, callback) {
    try {
      const model = new Warehouse(database);
      model.disableByProductId(product_id, callback);
    } catch (err) {
      throw err;
    }
  }

};
