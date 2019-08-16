import 'reflect-metadata';

import { agent, SuperTest, Test } from 'supertest';

import Product from '../../src/interfaces/Product';
import { Server } from './../../src/server';

describe('Products Resource', () => {
  let request: SuperTest<Test>;
  const sku = 12345;
  const name = 'Some product';
  const product = {
    sku,
    name,
    inventory: {
      warehouses: [
        { locality: 'Barcelona', quantity: 35, type: 'ECOMMERCE' },
        { locality: 'Madrid', quantity: 7, type: 'LOCAL' },
      ],
    },
  } as Product;

  beforeAll(() => {
    request = agent(new Server().app);
  });

  describe('[POST] Requests', () => {
    it('should return the product with status 201', async () => {
      const response = await request.post('/products').send(product);

      expect(response.status).toBe(201);
      expect(response.body).toStrictEqual({
        ...product,
        inventory: {
          quantity: 42,
          ...product.inventory,
        },
        isMarketable: true,
      });
    });

    it('should return an error when trying to create a product with an existing sku', async () => {
      const response = await request.post('/products').send(product);

      expect(response.status).toBe(409);
      expect(response.body).toStrictEqual({
        message: 'Product with SKU 12345 already exists.',
        status: 409,
      });
    });

    it('should return an error when trying to create a product with missing arguments', async () => {
      const response = await request.post('/products').send();

      expect(response.status).toBe(400);
      expect(response.body).toStrictEqual({ message: '"sku" is required', status: 400 });
    });
  });

  describe('[GET] Requests', () => {
    it('should return an array 1 product status 200', async () => {
      const response = await request.get('/products');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].sku).toBe(sku);
      expect(response.body[0].name).toBe(name);
    });

    it('should return a product given SKU', async () => {
      const response = await request.get(`/products/${sku}`);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe(name);
    });

    it('should return an error when trying to get a not found product', async () => {
      const nextSku = 123;
      const response = await request.get(`/products/${nextSku}`);

      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual({
        message: `Product with SKU ${nextSku} not found.`,
        status: 404,
      });
    });
  });

  describe('[PUT] Requests', () => {
    it('should return the product updated', async () => {
      const newName = 'Updated Product';
      const response = await request
        .put(`/products/${sku}`)
        .send({ ...product, name: newName, inventory: { warehouses: [] } });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe(newName);
      expect(response.body.inventory.quantity).toBe(0);
    });

    it('should return an error when trying to update a product with missing arguments', async () => {
      const response = await request.put(`/products/${sku}`).send({ sku, name });

      expect(response.status).toBe(400);
      expect(response.body).toStrictEqual({ message: '"inventory" is required', status: 400 });
    });

    it('should return an error when trying to update a not found product', async () => {
      const nextSku = 123;
      const response = await request.put(`/products/${nextSku}`).send();
      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual({
        message: `Product with SKU ${nextSku} not found.`,
        status: 404,
      });
    });
  });

  describe('[DELETE] Requests', () => {
    it('should delete a product', async () => {
      const response = await request.delete(`/products/${sku}`);

      expect(response.status).toBe(204);
      expect(response.noContent).toBeTruthy();
    });

    it('should return an error when trying to delete a not found product', async () => {
      const response = await request.delete(`/products/${sku}`);
      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual({
        message: `Product with SKU ${sku} not found.`,
        status: 404,
      });
    });
  });
});
