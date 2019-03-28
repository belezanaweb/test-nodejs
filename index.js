const app = require('express')()
const consign = require('consign')

consign()
    .include('./src/config/db.js')
    .then('./src/config/boot.js')
    .then('./src/config/middlewares.js')
    .then('./src/repositories')
    .then('./src/controllers')
    .then('./src/routes')
    .into(app)

module.exports = app