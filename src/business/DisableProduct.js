const path = require('path');
const Product = require(path.resolve('./src/model/Product'));

module.exports = class DisableProduct {

  disableById(database, id, callback) {
    try {
      const model = new Product(database);
      model.update({
        id: id,
        stat: 0
      }, callback);
    } catch (err) {
      throw err;
    }
  }

};
