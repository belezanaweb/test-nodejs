const path = require('path');
const Type = require(path.resolve('./src/model/Type'));

module.exports = class CreateType {

  create(database, warehouse, callback) {
    try {
      const model = new Type(database);
      model.findRowByName(warehouse.type, (row) => {
        if (row instanceof Object) {
          callback(row);
        } else {
          model.insert(new Object({
            'shortname': warehouse.type
          }), (result) => {
            model.findRowByName(warehouse.type, callback);
          });
        }
      });
    } catch (err) {
      throw err;
    }
  }

};
