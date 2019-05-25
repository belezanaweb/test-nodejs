const repository = require('../repository/ProductRepository')
const debug = require('debug')('wbruno:controller')

const ProductController = {
  list(request, response, next) {
    repository.list({})
      .then(result => response.json({ items: result }))
      .catch(next)
  },
  bySku(request, response, next) {
    let sku = request.params.sku
    repository.bySku(sku)
      .then(result => response.json(result))
      .catch(next)
  },
  create(request, response, next) {
    let body = request.body
    repository.create(body)
      .then(result => response.status(201).json(result))
      .catch(next)
  },
  update(request, response, next) {
    let sku = request.params.sku
    let body = request.body
    repository.update(sku, body)
      .then(result => response.json(result))
      .catch(next)
  },
  delete(request, response, next) {
    let sku = request.params.sku
    repository.delete(sku)
      .then(result => response.sendStatus(204))
      .catch(next)
  }
}

module.exports = ProductController
