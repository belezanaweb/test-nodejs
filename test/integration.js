const request = require('supertest');
const expect = require('chai').expect;
const app = require('../api/server');


describe('API testing', () => {
  before(() => request(app)
  .post('/products')
  .send({
    sku: 2,
    name: 'Green Lantern ring',
    inventory: {
      warehouses: [
        {
          locality: 'AM',
          quantity: 1,
          type: 'PHYSICAL_STORE'
        }
      ]
    }
  }));

  it('Should return 404 for an invalid endpoint', () => request(app)
    .get('/nothing-here')
    .expect(404));

  it('Should get a list of products', () => request(app)
    .get('/products/list')
    .expect(200)
    .then(data => {
      expect(data.body).to.be.instanceOf(Array);
      expect(data.body.length).to.equals(1);
      expect(data.body[0].sku).to.equals(2);
    }));

  it('Should fail POST /products for repeated sku', () => request(app)
    .post('/products')
    .send({
      sku: 2,
      name: 'Not a Green Lantern ring',
      inventory: {
        warehouses: [
          {
            locality: 'SP',
            quantity: 33,
            type: 'ECOMMERCE'
          }
        ]
      }
    })
    .expect(500));
});