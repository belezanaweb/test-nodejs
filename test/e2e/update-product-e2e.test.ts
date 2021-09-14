import nock from "nock";
import axios from "axios";

const url = 'http://localhost:3000';

describe('Update Products', () => {
  it('Update products - success', async () => {

    nock(url).post('/api/product/102030').reply(200, {
      "message": "Produto Atualizado!"
    });

    const response = await axios.post(`${url}/api/product/102030`, {
      "sku": 43264,
      "name": "dwqdwqdw",
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
    expect(response.status).toEqual(200);
    expect(response.data).toEqual({
      "message": "Produto Atualizado!"
    });
  });

  it('Update products - sku em uso', (done) => {

    nock(url).post('/api/product/102030').reply(400, {
      "error": "SKU em uso"
    });

    axios.post(`${url}/api/product/102030`, {
      "sku": 43264,
      "name": "dwqdwqdw",
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
    });
  });

  it('Update products - sku não encontrado', (done) => {

    nock(url).post('/api/product/99999').reply(400, {
      "error": "Produto não encontrado"
    });

    axios.post(`${url}/api/product/99999`, {
      "sku": 43264,
      "name": "dwqdwqdw",
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
        error: "Produto não encontrado"
      });
      done();
    });
  });
});
