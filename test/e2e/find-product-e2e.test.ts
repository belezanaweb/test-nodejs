import nock from "nock";
import axios from "axios";
import { IProductRepository } from "./../../src/repositories/iproduct.repository";

const url = 'http://localhost:3000';

describe('Find Products', () => {
  it('Find products - success', async () => {
    nock(url).get('/api/product/43264').reply(
      200,
      {
        sku: 43264,
        name: "Texto",
        inventory: {
          quantity: 15,
          warehouses: [
            {
              locality: "SP",
              quantity: 12,
              type: "ECOMMERCE"
            },
            {
              locality: "MOEMA",
              quantity: 3,
              type: "PHYSICAL_STORE"
            }
          ],
          isMarketable: true
        }
      }
    );

    const response = await axios.get(`${url}/api/product/43264`);
    const total = response.data.inventory.warehouses.reduce((sum, warehouse) => {
      return sum + warehouse.quantity;
    }, 0);

    expect(response.status).toEqual(200);
    expect(response.data.inventory.quantity).toEqual(total);
    expect(total > 0).toEqual(response.data.inventory.isMarketable);
    expect(response.data).toEqual(
      expect.objectContaining({
        sku: expect.any(Number),
        name: expect.any(String),
        inventory: expect.objectContaining({
          quantity: expect.any(Number),
          isMarketable: expect.any(Boolean),
          warehouses: expect.arrayContaining([
            expect.objectContaining({
              locality: expect.any(String),
              quantity: expect.any(Number),
              type: expect.any(String)
            })
          ])
        }),
      })
    );
  });

  it('Find products - Error', (done) => {
    nock(url).get('/api/product/999').reply(400, {
      error: "Produto não encontrado"
    });

    axios.get(`${url}/api/product/999`).catch(err => {
      const response = err.response.data;
      expect(err.response.status).toEqual(400);
      expect(response).toEqual({
        error: "Produto não encontrado"
      });
      done();
    })
  });
});
