const path = require('path');
const Table = require(path.resolve('./src/model/Table'));

module.exports = class Type extends Table {

  constructor(database) {
    super(database, 'type', new Array(
      'id', 'shortname'
    ));
  }

  findRowByName(shortname, callback) {
    try {
      let sql = `
      SELECT ${this._columns.join(',')}
      FROM ${this._tablename}
      WHERE shortname = $shortname 
      AND stat = $stat
      `;
      this._db.get(sql, {
        $shortname: shortname,
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
