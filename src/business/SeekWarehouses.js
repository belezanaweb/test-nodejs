const path = require('path');
const Warehouse = require(path.resolve('./src/model/Warehouse'));

module.exports = class SeekWarehouses {

  seek(database, product, callback) {
    try {
      if (undefined !== product.id) {
        const model = new Warehouse(database);
        model.findAllByProductId(product.id, (rowSet) => {
          if (rowSet instanceof Array) {
            callback(rowSet);
          } else {
            callback(false);
          }
        });
      } else {
        callback(false);
      }
    } catch (err) {
      throw err;
    }
  }

};
