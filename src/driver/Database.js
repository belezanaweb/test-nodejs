const path = require('path');
const sqlite3 = require('sqlite3').verbose();

module.exports = class Database {

  constructor() {
    this._db = null;
    this._database = path.resolve('./src/db/database.db');
  }

  connect() {
    if (!(this._db instanceof Object)) {
      this._db = new sqlite3.Database(this._database, (err) => {
        if (err) throw err;
      });
    }
    return this._db;
  }

  close() {
    if (this._db instanceof Object) {
      this._db.close();
    }
    this._db = null;
  }

};
