const path = require('path');
const Product = require(path.resolve('./src/model/Product'));

module.exports = class EditProduct {

  edit(database, data, callback) {
    try {
      let register = new Object({
        'id': data.sku,
        'name': data.name,
        'stat': 1
      });
      const model = new Product(database);
      model.findRowById(register.id, (row) => {
        if (row instanceof Object) {
          model.update(register, (result) => {
            model.findRowById(register.id, callback);
          });
        } else {
          callback(false);
        }
      });
    } catch (err) {
      throw err;
    }
  }

};
