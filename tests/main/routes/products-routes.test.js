const request = require('supertest')
const app = require('../../../src/main/config/app')
const { ProductsRepository } = require('../../../src/infra/db/memory')

describe('Products Routes', () => {
  test('/POST products', (done) => {
    request(app)
      .post('/api/v1/products')
      .send({
        sku: 43264,
        name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
        inventory: {
          warehouses: [
            {
              locality: 'SP',
              quantity: 12,
              type: 'ECOMMERCE'
            },
            {
              locality: 'MOEMA',
              quantity: 3,
              type: 'PHYSICAL_STORE'
            }
          ]
        }
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err)

        const { body } = res
        expect(body).toBeTruthy()
        expect(typeof body.sku).toBe('number')
        expect(typeof body.name).toBe('string')
        expect(typeof body.inventory).toBe('object')
        expect(typeof body.inventory.warehouses[0].locality).toBe('string')
        expect(typeof body.inventory.warehouses[0].type).toBe('string')
        expect(typeof body.inventory.warehouses[0].quantity).toBe('number')
        done()
      })
  })

  test('/GET products by sku', (done) => {
    ProductsRepository.add({
      sku: 43262,
      name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
      inventory: {
        warehouses: [
          {
            locality: 'SP',
            quantity: 12,
            type: 'ECOMMERCE'
          },
          {
            locality: 'MOEMA',
            quantity: 3,
            type: 'PHYSICAL_STORE'
          }
        ]
      }
    })

    request(app)
      .get('/api/v1/products/43262')
      .expect(200)
      .expect('Content-Type', /json/).end((err, res) => {
        if (err) return done(err)

        const { body } = res
        expect(body).toBeTruthy()
        expect(typeof body.sku).toBe('number')
        expect(typeof body.name).toBe('string')
        expect(typeof body.inventory).toBe('object')
        expect(typeof body.inventory.warehouses[0].locality).toBe('string')
        expect(typeof body.inventory.warehouses[0].type).toBe('string')
        expect(typeof body.inventory.warehouses[0].quantity).toBe('number')

        expect(typeof body.isMarketable).toBe('boolean')
        expect(typeof body.inventory.quantity).toBe('number')

        done()
      })
  })

  test('Should return 204 when delete product', async () => {
    await request(app)
      .delete('/api/v1/products/43264')
      .expect(204)
  })
})
