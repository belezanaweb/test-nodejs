import nock from "nock";
import axios from "axios";

const url = 'http://localhost:3000';

describe('Get Products', () => {
  it('Get products - success', async () => {
    nock(url).get('/api/products').reply(
      200,
      [{
        sku: 43264,
        name: "Name",
        inventory: {
          warehouses: [{
            locality: "MOEMA",
            quantity: 3,
            type: "PHYSICAL_STORE"
          }]
        }
      }]
    );

    const response = await axios.get(`${url}/api/products`);
    expect(response.status).toEqual(200);

    expect(response.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          sku: expect.any(Number),
          name: expect.any(String),
          inventory: expect.objectContaining({
            warehouses: expect.arrayContaining([
              expect.objectContaining({
                locality: expect.any(String),
                quantity: expect.any(Number),
                type: expect.any(String)
              })
            ])
          }),
        })
      ])
    );
  });

  it('Get products - empty', async () => {
    nock(url).get('/api/products').reply(200, []);
    const response = await axios.get(`${url}/api/products`);
    expect(response.status).toEqual(200);
    expect(response.data).toEqual([]);
  });
});
