const path = require('path');
const Database = require(path.resolve('./src/driver/Database'));
const EditProduct = require(path.resolve('./src/business/EditProduct'));
const CreateWarehouse = require(path.resolve('./src/business/CreateWarehouse'));

module.exports = class PutProduct {

  doit(data, callback) {
    try {
      let database = new Database();
      (new EditProduct()).edit(database, data, (product) => {
        if (product instanceof Object) {
          callback(true);
          data.inventory.warehouses.forEach(warehouse => {
            (new CreateWarehouse()).create(database, product, warehouse, (result) => {
              database.close();
            });
          });
        } else {
          callback(false);
        }
      });
    } catch (err) {
      database.close();
      throw err;
    }
  }

}
