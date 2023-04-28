const fs = require('fs');
const path = require('path');
const { DataTypes } = require('sequelize');

/* this module is responsible for loading sequelize
models and associations into the database object */

module.exports = {
  load({ sequelize, baseFolder, indexFile = 'index.js' }) {
    sequelize.addHook('beforeCount', function (options) {
      if (this._scope.include && this._scope.include.length > 0) {
        options.distinct = true;
        options.col = this._scope.col || options.col || `"${this.options.name.singular}".id`;
      }

      if (options.include && options.include.length > 0) {
        options.include = null;
      }
    });
    fs.readdirSync(baseFolder)
      .filter((file) => {
        return file.indexOf('.') !== 0 && file !== indexFile && file.slice(-3) === '.js';
      })
      .forEach((file) => {
        const model = require(path.join(baseFolder, file));
        return model(sequelize, DataTypes);
      });

    for (const model in sequelize.models) {
      sequelize.models[model].associate(sequelize.models);
    }

    return sequelize;
  }
};
