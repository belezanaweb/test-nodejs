const request = require('supertest')
const app = require('./server')

describe('Test SKU server', () => {
  const SKU = Math.floor((Math.random() * 100) + 1)

  it('Should post main route', async () => {
    const res = await request(app)
      .post('/products')
      .send({
        sku: SKU,
        name: 'PRODUCT',
        inventory: {
          warehouses: [{
            locality: 'CWB',
            quantity: 1,
            type: 'ECOMMERCE'
          }]
        }
      })
    expect(res.statusCode).toEqual(201)
  })

  it('Should get all main route', async () => {
    const res = await request(app).get('/products')
    expect(res.statusCode).toEqual(200)
  })

  it('Should get one main route', async () => {
    const res = await request(app).get(`/products/${SKU}`)
    expect(res.statusCode).toEqual(200)
  })

  it('Should update main route', async () => {
    const res = await request(app)
      .put(`/products/${SKU}`)
      .send({
        sku: SKU,
        name: 'PRODUCT',
        inventory: {
          warehouses: [{
            locality: 'SP',
            quantity: 5,
            type: 'PHYSICAL_STORE'
          }]
        }
      })
    expect(res.statusCode).toEqual(200)
  })

  it('Should delete main route', async () => {
    const res = await request(app)
      .delete(`/products/${SKU}`)
    expect(res.statusCode).toEqual(204)
  })

})
