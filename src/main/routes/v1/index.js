const router = require('express').Router()
const { readdirSync } = require('fs')
const path = require('path')

const ignoreFiles = ['index.js']

readdirSync(__dirname).forEach(async file => {
  if (!ignoreFiles.includes(file)) {
    await require(path.join(__dirname, file))(router)
  }
})
module.exports = router
