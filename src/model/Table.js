const path = require('path');

module.exports = class Table {

  constructor(database, tablename, columns) {
    try {
      this._db = database.connect();
      this._tablename = tablename;
      this._columns = (columns instanceof Array) ? columns : new Array();
      Object.freeze(this);
    } catch (err) {
      throw err;
    }
  }

  insert(row, callback) {
    try {
      let conditions = this._prepareConditions(row, ', ');
      this._db.run(`INSERT INTO ${this._tablename} (${conditions.keys}) VALUES (${conditions.values})`, conditions.params, (err) => {
        if (err) throw err;
        if (callback instanceof Function) callback(true);
      });
    } catch (err) {
      throw err;
    }
  }

  update(row, callback) {
    try {
      let conditions = this._prepareConditions(row, ', ');
      this._db.run(`UPDATE ${this._tablename} SET ${conditions.columns} WHERE id = $id`, conditions.params, (err) => {
        if (err) throw err;
        if (callback instanceof Function) callback(true);
      });
    } catch (err) {
      throw err;
    }
  }

  findAllByParams(params, callback) {
    try {
      let conditions = this._prepareConditions(params, ', ');
      this._db.all(`SELECT ${this._columns.join(',')} FROM ${this._tablename} WHERE ${conditions.columns}`, conditions.params, (err, rowSet) => {
        if (err) throw err;
        if (callback instanceof Function) callback(rowSet);
      });
    } catch (err) {
      throw err;
    }
  }

  findRowById(id, callback) {
    try {
      this._db.get(`SELECT ${this._columns.join(',')} FROM ${this._tablename} WHERE id = $id`, {
        $id: id
      }, (err, row) => {
        if (err) throw err;
        if (callback instanceof Function) callback(row);
      });
    } catch (err) {
      throw err;
    }
  }

  _prepareConditions(row, separator) {
    let keys = new Array();
    let values = new Array();
    let columns = new Array();
    let params = new Object();
    if (row instanceof Object) {
      for (let key in row) {
        keys.push(key);
        values.push(`$${key}`);
        columns.push(`${key} = $${key}`);
        params[`$${key}`] = row[key];
      }
    }
    return new Object({
      'keys': keys.join(','),
      'values': values.join(','),
      'columns': columns.join(separator),
      'params': params
    });
  }

};
