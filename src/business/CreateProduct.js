const path = require('path');
const Product = require(path.resolve('./src/model/Product'));

module.exports = class CreateProduct {

  create(database, data, callback) {
    try {
      let register = new Object({
        'id': data.sku,
        'name': data.name
      });
      const model = new Product(database);
      model.findRowById(register.id, (row) => {
        if (row instanceof Object) {
          callback(false);
        } else {
          model.insert(register, (result) => {
            model.findRowById(register.id, callback);
          });
        }
      });
    } catch (err) {
      throw err;
    }
  }

};
