const db = require('../../server/config/memory')

describe('products', () => {
  const PRODUCT = { sku: 42 };

  beforeEach(done => {
    db.collection('products').insert(PRODUCT)
    done()
  })
  afterEach(done => {
    db.collection('products').remove({})
    done()
  })

  it('GET /products', () => {
    return request.get('/products')
      .then(result => {
        assert.equal(200, result.status)
        assert.equal(PRODUCT.sku, result.body.items[0].sku)
        assert.equal(1, result.body.items.length)
      })
  })

  it('GET /products/:sku', () => {
    return request.get('/products/42')
      .then(result => {
        assert.equal(200, result.status)
        assert.equal(PRODUCT.sku, result.body.sku)
      })
  })

  it('POST /products', () => {
    let obj = { sku: 14 }
    return request.post('/products')
      .send(obj)
      .then(result => {
        assert.equal(201, result.status)
        assert.equal(14, result.body.sku)
      })
  })

  it('PUT /products/:sku', () => {
    let obj = { name: 'Shampoo Loreal 500ml' }
    return request.put('/products/42')
      .send(obj)
      .then(result => {
        assert.equal(200, result.status)
        assert.equal(PRODUCT.sku, result.body.sku)
        assert.equal(obj.name, result.body.name)
      })
  })


  it('DELETE /products/:sku', () => {
    return request.delete('/products/42')
      .then(result => {
        assert.equal(204, result.status)
      })
  })
})
