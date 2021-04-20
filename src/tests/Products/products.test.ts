// import { MockProxy } from 'jest-mock-extended';
import request from 'supertest';
// import { MongoRepository } from 'typeorm';

// jest.mock('typeorm');
jest.mock('../../../src/middlewares/logger');
describe('## Products Module ##', () => {
  // Importamos a instância do express para usar com supertest
  const { app } = require('../../app').default;

  // Aqui é a instância do typeorm que vai na base de dados
  // const repository = require('../../apps/Products/ProductsController') as MockProxy<any>;

  // Vamos separar os endpoints do crud por blocos

  describe('GET & POST methods', () => {
    // Aqui vamos escrever os testes para o método findOne da classe de serviço
    test('should return error when product does not exists', async () => {
      await request(app).get('/api/products/some-id').expect({
        message: 'Produto não encontrado',
      });
    });
  });

  test('should create and return a product', async () => {
    const product = {
      sku: 123,
      name: 'Teste',
      inventory: {
        quantity: null,
        wharehouses: [
          {
            locality: 'Marituba',
            quantity: 1,
            type: 'ECOMMERCE',
          },
          {
            locality: 'Belém',
            quantity: 1,
            type: 'PHYSICAL_STORE',
          },
        ],
      },
      isMarketable: null,
    };

    const parameter = 123;
    await request(app)
      .post('/api/products/')
      .send(product)
      .then(() => request(app).get(`/api/products/${parameter}`).expect(200));
  });

  test('should return a error 409 if a product already exist', async () => {
    const product = {
      sku: 12,
      name: 'Teste',
      inventory: {
        quantity: null,
        wharehouses: [
          {
            locality: 'Marituba',
            quantity: 1,
            type: 'ECOMMERCE',
          },
          {
            locality: 'Belém',
            quantity: 1,
            type: 'PHYSICAL_STORE',
          },
        ],
      },
      isMarketable: null,
    };

    const sameProduct = {
      sku: 12,
      name: 'Teste',
      inventory: {
        quantity: null,
        wharehouses: [
          {
            locality: 'Marituba',
            quantity: 1,
            type: 'ECOMMERCE',
          },
          {
            locality: 'Belém',
            quantity: 1,
            type: 'PHYSICAL_STORE',
          },
        ],
      },
      isMarketable: null,
    };

    await request(app)
      .post('/api/products/')
      .send(product)
      .then(() =>
        request(app).post('/api/products/').send(sameProduct).expect(409),
      );
  });

  describe('PUT method', () => {
    test('should return error when product does not exists', async () => {
      const parameter = 1234;
      await request(app).put(`/api/products/${parameter}`).send().expect(404);
    });

    test('should update a product', async () => {
      const product = {
        sku: 1234,
        name: 'Teste',
        inventory: {
          quantity: null,
          wharehouses: [
            {
              locality: 'Porto Alegre',
              quantity: 1,
              type: 'ECOMMERCE',
            },
            {
              locality: 'Belém',
              quantity: 1,
              type: 'PHYSICAL_STORE',
            },
          ],
        },
        isMarketable: null,
      };

      const parameter = 1234;
      await request(app)
        .post('/api/products/')
        .send(product)
        .then(() => request(app).post(`/api/products/${parameter}`));

      const productUpdated = {
        sku: 1234,
        name: 'TesteUpdate',
        inventory: {
          quantity: null,
          wharehouses: [
            {
              locality: 'São Paulo',
              quantity: 2,
              type: 'ECOMMERCE',
            },
            {
              locality: 'Fortaleza',
              quantity: 1,
              type: 'PHYSICAL_STORE',
            },
          ],
        },
        isMarketable: null,
      };

      await request(app)
        .put(`/api/products/${parameter}`)
        .send(productUpdated)
        .expect(200);
    });
  });

  describe('DELETE method', () => {
    test('should return error when product does not exists', async () => {
      const parameter = 12345;
      await request(app)
        .delete(`/api/products/${parameter}`)
        .send()
        .expect(404);
    });

    test('should delete a product', async () => {
      const productToDelete = {
        sku: 123456,
        name: 'TesteUpdate',
        inventory: {
          quantity: null,
          wharehouses: [
            {
              locality: 'São Paulo',
              quantity: 2,
              type: 'ECOMMERCE',
            },
            {
              locality: 'Fortaleza',
              quantity: 1,
              type: 'PHYSICAL_STORE',
            },
          ],
        },
        isMarketable: null,
      };
      const parameter = 123456;

      await request(app)
        .post('/api/products/')
        .send(productToDelete)
        .then(() => {
          request(app).delete(`/api/products/${parameter}`).expect(200);
        });
    });
  });
});
