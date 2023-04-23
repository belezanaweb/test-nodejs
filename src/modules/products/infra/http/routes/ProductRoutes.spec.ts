import '../../../../../shared/container';
import App from '../../../../../shared/infra/http/App';

import { mockProduct as mock } from '../../../../../shared/mocks/product';

const request = require('supertest');

const server = new App();

describe('Rotas de produtos - Sucesso', () => {
  it('should be able find produto having sku=1', async () => {
    const sku = 1;
    const resp = await request(server.getApp())
      .get(`/api/product/${sku}`)
      .send();
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual(mock.DATA_RESPONSE.product_1);
  });

  it('should be able create a produto having sku=2', async () => {
    const resp = await request(server.getApp())
      .post('/api/product')
      .send(mock.BODY_REQUEST.product_2);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual(mock.DATA_RESPONSE.product_2);
  });

  it('should be able update a produto having sku=2', async () => {
    const sku = 2;
    const mockUpd = mock.BODY_REQUEST.product_2;
    mockUpd.name = 'Protetor Labial com filtro solar';
    const resp = await request(server.getApp())
      .put(`/api/product/${sku}`)
      .send(mockUpd);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual(mockUpd);
  });

  it('should be able delete a product having sku=2', async () => {
    const sku = 2;
    const resp = await request(server.getApp())
      .delete(`/api/product/${sku}`)
      .send();
    expect(resp.statusCode).toEqual(200);
  });
});
