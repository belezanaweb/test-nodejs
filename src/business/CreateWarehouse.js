const path = require('path');
const Warehouse = require(path.resolve('./src/model/Warehouse'));
const CreateType = require(path.resolve('./src/business/CreateType'));
const CreateLocality = require(path.resolve('./src/business/CreateLocality'));
const DisableWarehouse = require(path.resolve('./src/business/DisableWarehouse'));

module.exports = class CreateWarehouse {

  create(database, product, warehouse, callback) {
    try {
      if (undefined !== product.id) {
        (new DisableWarehouse()).disableByProductId(database, product.id);
      }
      (new CreateLocality()).create(database, warehouse, (locality) => {
        (new CreateType()).create(database, warehouse, (type) => {
          let register = new Object({
            "product_id": product.id,
            "locality_id": locality.id,
            "type_id": type.id,
            "quantity": parseFloat(warehouse.quantity)
          });
          (new Warehouse(database)).insert(register, callback);
        });
      });
    } catch (err) {
      throw err;
    }
  }

};
