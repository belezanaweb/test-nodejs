const mongo = require('mongoose');
const mLab = require('../mongoLabConnect');

mongo.connect(`mongodb://${mLab.dbuser}:${mLab.dbpassword}${mLab.base}`, { useNewUrlParser: true });

mongo.Promise = global.Promise;
console.log('.. Mongo MLAB - Beleza Na web Conectado');

module.exports = mongo;