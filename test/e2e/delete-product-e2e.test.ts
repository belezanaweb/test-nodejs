import nock from "nock";
import axios from "axios";
import { IProductRepository } from "./../../src/repositories/iproduct.repository";

const url = 'http://localhost:3000';

describe('Delete Products', () => {

  it('Delete product - success', async () => {
    nock(url).delete('/api/product/43264').reply(200, {
      "message": "Produto deletado com sucesso"
    });

    const response = await axios.delete(`${url}/api/product/43264`);
    expect(response.status).toEqual(200);
    expect(response.data).toEqual({
      "message": "Produto deletado com sucesso"
    });
  });

  it('Delete products - Error', (done) => {
    nock(url).delete('/api/product/43264').reply(400, {
      error: "Produto não encontrado"
    });

    axios.delete(`${url}/api/product/43264`).catch(err => {
      const response = err.response.data;
      expect(err.response.status).toEqual(400);
      expect(response).toEqual({
        error: "Produto não encontrado"
      });
      done();
    })
  });
});
