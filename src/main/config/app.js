const express = require('express')
const app = express()

require('./routes')(app)
require('./setup')(app)

module.exports = app
