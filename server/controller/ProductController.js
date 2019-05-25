const repository = require('repository/ProductRepository')
const debug = require('debug')('wbruno:controller')


const handleNotFound = (result) => {
  if(!result) {
    let err = new Error('Product not found')
    err.status = 404
    throw err
  }
  return result
}
const conflict = (err) => {
  debug('err.message', err.message)
  if (err.message === 'conflict')
    err.status = 409
}
const notfound = (err) => {
  if (err.message === 'not found')
    err.status = 404
}

const ProductController = {
  list(request, response, next) {
    repository.list(request.query)
      .then(result => response.json({ items: result }))
      .catch(next)
  },
  bySku(request, response, next) {
    let sku = request.params.sku
    repository.bySku(sku)
      .then(handleNotFound)
      .then(result => response.json(result))
      .catch(next)
  },
  create(request, response, next) {
    let body = request.body
    repository.create(body)
      .then(result => response.status(201).json(result))
      .catch(err => {
        conflict(err)
        next(err)
      })
  },
  update(request, response, next) {
    let sku = request.params.sku
    let body = request.body
    repository.update(sku, body)
      .then(result => response.json(result))
      .catch(err => {
        notfound(err)
        next(err)
      })
  },
  upsert(request, response, next) {
    let body = request.body
    repository.upsert(body)
      .then(result => response.json(result))
      .catch(next)
  },
  patch(request, response, next) {
    let sku = request.params.sku
    let body = request.body
    repository.patch(sku, body)
      .then(result => response.json(result))
      .catch(err => {
        notfound(err)
        next(err)
      })
  },
  delete(request, response, next) {
    let sku = request.params.sku
    repository.delete(sku)
      .then(() => response.sendStatus(204))
      .catch(next)
  }
}

module.exports = ProductController
