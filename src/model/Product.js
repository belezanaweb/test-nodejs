const path = require('path');
const Table = require(path.resolve('./src/model/Table'));

module.exports = class Product extends Table {

  constructor(database) {
    super(database, 'product', new Array(
      'id', 'name'
    ));
  }

  findRowEnableById(id, callback) {
    try {
      this._db.get(`SELECT ${this._columns.join(',')} FROM ${this._tablename} WHERE id = $id AND stat = $stat`, {
        $id: id,
        $stat: 1
      }, (err, row) => {
        if (err) throw err;
        if (callback instanceof Function) callback(row);
      });
    } catch (err) {
      throw err;
    }
  }

};
