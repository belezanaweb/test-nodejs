const path = require('path');
const Table = require(path.resolve('./src/model/Table'));

module.exports = class Warehouse extends Table {

  constructor(database) {
    super(database, 'warehouse', new Array(
      'id', 'product_id', 'locality_id', 'type_id', 'quantity'
    ));
  }

  findAllByProductId(product_id, callback) {
    try {
      let sql = `
      SELECT l.shortname AS locality, t.shortname AS type, SUM(quantity) AS quantity
      FROM ${this._tablename} w
      INNER JOIN locality l
        ON l.id = w.locality_id
        AND l.stat = $stat
      INNER JOIN type t
        ON t.id = w.type_id
        AND t.stat = $stat
      WHERE w.product_id = $product_id
      AND w.stat = $stat
      GROUP BY locality_id, type_id
      `;
      this._db.all(sql, {
        '$product_id': product_id,
        '$stat': 1
      }, (err, rowSet) => {
        if (err) throw err;
        if (callback instanceof Function) callback(rowSet);
      });
    } catch (err) {
      throw err;
    }
  }

  disableByProductId(product_id, callback) {
    try {
      this._db.run(`UPDATE ${this._tablename} SET stat = $disable WHERE product_id = $product_id AND stat = $enable`, {
        $product_id: product_id,
        $enable: 1,
        $disable: 0,
      }, (err) => {
        if (err) throw err;
        if (callback instanceof Function) callback(true);
      });
    } catch (err) {
      throw err;
    }
  }

};
