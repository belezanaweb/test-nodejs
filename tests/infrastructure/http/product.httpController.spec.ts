import request from 'supertest';
import testApp from '../../../src/index';

describe('ProductHttpController', () => {
  test('should create a product', async () => {
    const productData = {
      sku: 1,
      name: 'Test Product',
      inventory: {
        warehouses: [
          { locality: 'SP', quantity: 10, type: 'ECOMMERCE' },
          { locality: 'MOEMA', quantity: 5, type: 'PHYSICAL_STORE' },
        ],
      },
    };

    const response = await request(testApp).post('/products').send(productData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(productData);
  });

  test('should get a product', async () => {
    const productData = {
      sku: 1,
      name: 'Test Product',
      inventory: {
        warehouses: [
          { locality: 'SP', quantity: 10, type: 'ECOMMERCE' },
          { locality: 'MOEMA', quantity: 5, type: 'PHYSICAL_STORE' },
        ],
      },
    };

    await request(testApp).post('/products').send(productData);

    const productResult = {
      sku: 1,
      name: 'Test Product',
      inventory: {
        quantity: 15,
        warehouses: [
          { locality: 'SP', quantity: 10, type: 'ECOMMERCE' },
          { locality: 'MOEMA', quantity: 5, type: 'PHYSICAL_STORE' },
        ],
      },
      isMarketable: true,
    };

    const response = await request(testApp).get('/products/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(productResult);
  });

  test('should update a product', async () => {
    const productData = {
      sku: 1,
      name: 'Updated Test Product',
      inventory: {
        warehouses: [
          { locality: 'SP', quantity: 11, type: 'ECOMMERCE' },
          { locality: 'MOEMA', quantity: 6, type: 'PHYSICAL_STORE' },
        ],
      },
    };

    await request(testApp).post('/products').send(productData);

    const updatedProductData = {
      sku: 1,
      name: 'Updated Test Product',
      inventory: {
        warehouses: [
          { locality: 'SP', quantity: 11, type: 'ECOMMERCE' },
          { locality: 'MOEMA', quantity: 6, type: 'PHYSICAL_STORE' },
        ],
      },
    };

    const response = await request(testApp).put('/products/1').send(updatedProductData);

    const updatedProductResult = {
      sku: 1,
      name: 'Updated Test Product',
      inventory: {
        quantity: 17,
        warehouses: [
          { locality: 'SP', quantity: 11, type: 'ECOMMERCE' },
          { locality: 'MOEMA', quantity: 6, type: 'PHYSICAL_STORE' },
        ],
      },
      isMarketable: true,
    };

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedProductResult);
  });

  test('should get updated product', async () => {
    const productData = {
      sku: 1,
      name: 'Updated Test Product',
      inventory: {
        warehouses: [
          { locality: 'SP', quantity: 11, type: 'ECOMMERCE' },
          { locality: 'MOEMA', quantity: 6, type: 'PHYSICAL_STORE' },
        ],
      },
    };

    await request(testApp).post('/products').send(productData);

    const response = await request(testApp).get('/products/1');

    const productResult = {
      sku: 1,
      name: 'Updated Test Product',
      inventory: {
        quantity: 17,
        warehouses: [
          { locality: 'SP', quantity: 11, type: 'ECOMMERCE' },
          { locality: 'MOEMA', quantity: 6, type: 'PHYSICAL_STORE' },
        ],
      },
      isMarketable: true,
    };

    expect(response.status).toBe(200);
    expect(response.body).toEqual(productResult);
  });

  test('should delete a product', async () => {
    const productData = {
      sku: 2,
      name: 'Test Product',
      inventory: {
        warehouses: [
          { locality: 'SP', quantity: 10, type: 'ECOMMERCE' },
          { locality: 'MOEMA', quantity: 5, type: 'PHYSICAL_STORE' },
        ],
      },
    };

    await request(testApp).post('/products').send(productData);

    const deleteResponse = await request(testApp).delete('/products/2');
    expect(deleteResponse.status).toBe(204);

    const getResponse = await request(testApp).get('/products/2');
    expect(getResponse.status).toBe(404);
  });

  test('should get an error when updating an invalid product', async () => {
    const response = await request(testApp).put('/products/aaa').send(undefined);

    expect(response.status).toBe(400);
  });
});
