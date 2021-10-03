const supertest = require('supertest');

const app = require('../src/app');
const data = require('./product.test.mock');

let server;

describe('test products', () => {
  beforeAll(async () => {
    return (server = app.listen(null, () => {
      global.agent = supertest.agent(server);
    }));
  });

  it('GET /products', async () => {
    const response = await supertest(app).get(`/products/${data[0].sku}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(data[0]);
  });

  it('POST /products', async () => {
    const response = await supertest(app).post(`/products`).send(data[1]);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'product created' });
  });

  it('PUT /products', async () => {
    const response = await supertest(app)
      .put(`/products/${data[0].sku}`)
      .send(data[0]);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'product updated' });
  });

  it('DELETE /products', async () => {
    const response = await supertest(app).delete(`/products/${data[0].sku}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'product deleted' });
  });

  it('PUT /products error', async () => {
    const response = await supertest(app)
      .put(`/products/${data[3].sku}`)
      .send(data[3]);

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ error: 'product doesn`t exists' });
  });

  it('PUT /products error sku', async () => {
    const response = await supertest(app)
      .put(`/products/${data[2].sku}`)
      .send(data[3]);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      error: 'product sku doesn`t match with request body',
    });
  });

  it('DELETE /products error', async () => {
    const response = await supertest(app).delete(`/products/${data[3].sku}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ error: 'product doesn`t exists' });
  });

  afterAll(async () => {
    await server.close();
  });
});
