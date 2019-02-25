const path = require('path');
const Database = require(path.resolve('./src/driver/Database'));
const SeekProduct = require(path.resolve('./src/business/SeekProduct'));
const CalcInventory = require(path.resolve('./src/business/CalcInventory'));
const SeekWarehouses = require(path.resolve('./src/business/SeekWarehouses'));

module.exports = class GetProduct {

  doit(id, callback) {
    try {
      const database = new Database();
      const inventory = new CalcInventory();
      (new SeekProduct()).seek(database, id, (product) => {
        if (product instanceof Object) {
          (new SeekWarehouses()).seek(database, product, (warehouses) => {
            database.close();
            callback(new Object({
              'sku': product.id,
              'name': product.name,
              'inventory': {
                'quantity': inventory.quantity(warehouses),
                'warehouses': warehouses
              },
              'isMarketable': inventory.isMarketable(warehouses)
            }));
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
