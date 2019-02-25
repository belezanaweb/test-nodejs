const path = require('path');
const Locality = require(path.resolve('./src/model/Locality'));

module.exports = class CreateLocality {

  create(database, warehouse, callback) {
    try {
      const model = new Locality(database);
      model.findRowByShortname(warehouse.locality, (row) => {
        if (row instanceof Object) {
          callback(row);
        } else {
          model.insert(new Object({
            'shortname': warehouse.locality
          }), (result) => {
            model.findRowByShortname(warehouse.locality, callback);
          });
        }
      });
    } catch (err) {
      throw err;
    }
  }

};
