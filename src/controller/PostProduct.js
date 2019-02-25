const path = require('path');
const Database = require(path.resolve('./src/driver/Database'));
const CreateProduct = require(path.resolve('./src/business/CreateProduct'));
const CreateWarehouse = require(path.resolve('./src/business/CreateWarehouse'));

module.exports = class PostProduct {

  doit(data, callback) {
    try {
      let database = new Database();
      (new CreateProduct()).create(database, data, (product) => {
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
