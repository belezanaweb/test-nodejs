const debug = require('debug')('wbruno:repository')
const util = require('util')
const db = require('config/memory')
const products = db.collection('products')
const domain = require('domain/Product')


const ProductRepository = {
  list(query, callback) {
    let result = products.find(query)
    callback(null, result.map(item => domain.getProduct(item)))
  },
  bySku(sku, callback) {
    let result = products.findOne({ sku })
    callback(null, result ? domain.getProduct(result) : null)
  },
  create(data, callback) {
    let result = products.insert(data)
    callback(null, domain.getProduct(result))
  },
  update(sku, data, callback) {
    let result = products.update({ sku }, data)
    callback(null, domain.getProduct(result))
  },
  upsert(data, callback) {
    let result = products.upsert(data)
    callback(null, domain.getProduct(result))
  },
  patch(sku, data, callback) {
    let result = products.patch({ sku }, data)
    callback(null, domain.getProduct(result))
  },
  delete(sku, callback) {
    let result = products.remove({ sku })
    callback(null, result)
  }
}

Object.keys(ProductRepository).forEach(fn => {
  ProductRepository[fn] = util.promisify(ProductRepository[fn])
})

module.exports = ProductRepository
