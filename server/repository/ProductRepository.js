const util = require('util')
const db = require('../config/memory')
const products = db.collection('products')


const ProductRepository = {
  list(query, callback) {
    var result = products.find(query)
    callback(null, result)
  },
  bySku(sku, callback) {
    var result = products.findOne({ sku })
    callback(null, result)
  },
  create(data, callback) {
    var result = products.insert(data)
    callback(null, result)
  },
  update(sku, data, callback) {
    var result = products.update({ sku }, data)
    callback(null, result)
  },
  delete(sku, callback) {
    var result = products.remove({ sku })
    callback(null, result)
  }
}

Object.keys(ProductRepository).forEach(fn => {
  ProductRepository[fn] = util.promisify(ProductRepository[fn])
})

module.exports = ProductRepository
