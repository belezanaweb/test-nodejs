const path = require('path');
const Database = require(path.resolve('./src/driver/Database'));
const DisableProduct = require(path.resolve('./src/business/DisableProduct'));
const DisableWarehouse = require(path.resolve('./src/business/DisableWarehouse'));

module.exports = class DeleteProduct {

  doit(id, callback) {
    try {
      let database = new Database();
      (new DisableWarehouse()).disableByProductId(database, id, (result) => {
        (new DisableProduct()).disableById(database, id, (result) => {
          database.close();
        });
      });
      callback(true);
    } catch (err) {
      database.close();
      throw err;
    }
  }

}
