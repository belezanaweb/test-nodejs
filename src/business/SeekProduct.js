const path = require('path');
const Product = require(path.resolve('./src/model/Product'));

module.exports = class SeekProduct {

  seek(database, id, callback) {
    try {
      const model = new Product(database);
      model.findRowEnableById(id, (row) => {
        if (row instanceof Object) {
          callback(row)
        } else {
          callback(false);
        }
      });
    } catch (err) {
      throw err;
    }
  }

};
