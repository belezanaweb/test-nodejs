import nock from "nock";
import axios from "axios";

const url = 'http://localhost:3000';

describe('Create Products', () => {
  it('Create products - success', async () => {

    nock(url).post('/api/product').reply(201, {
      "message": "Produto cadastrado!"
    });

    const response = await axios.post(`${url}/api/product`, {
      "sku": 102030,
      "name": "Texto",
      "inventory": {
        "warehouses": [
          {
            "locality": "SP",
            "quantity": 12,
            "type": "ECOMMERCE"
          },
          {
            "locality": "MOEMA",
            "quantity": 3,
            "type": "PHYSICAL_STORE"
          }
        ]
      }
    });
    expect(response.status).toEqual(201);
    expect(response.data).toEqual({
      "message": "Produto cadastrado!"
    });
  });

  it('Get products - sku exist', (done) => {
    nock(url).post('/api/product').reply(400, {
      "error": "SKU em uso"
    });
    axios.post(`${url}/api/product`, {
      "sku": 102030,
      "name": "Texto",
      "inventory": {
        "warehouses": [
          {
            "locality": "SP",
            "quantity": 12,
            "type": "ECOMMERCE"
          },
          {
            "locality": "MOEMA",
            "quantity": 3,
            "type": "PHYSICAL_STORE"
          }
        ]
      }
    }).catch(err => {
      const response = err.response.data;
      expect(err.response.status).toEqual(400);
      expect(response).toEqual({
        error: "SKU em uso"
      });
      done();
    })
  });
});
