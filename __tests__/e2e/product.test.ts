import { IProduct } from './../../src/api/product/product.interface';
import request from 'supertest';
import { mockProducts } from '../../__mocks__';
import { STATUS_CODE } from '../../src/util/types';
import app from '../../src';

describe('Product endpoints', () => {
  const [firstProduct, secondProduct] = mockProducts;

  it('[POST] - create new product', async () => {
    const response = await request(app).post('/products').send(firstProduct);
    expect(response.statusCode).toEqual(STATUS_CODE.CREATED);
    expect(response.body).toEqual(firstProduct);
  });

  it('[POST] - create secondProduct product', async () => {
    const response = await request(app).post('/products').send(secondProduct);
    expect(response.statusCode).toEqual(STATUS_CODE.CREATED);
    expect(response.body).toEqual(secondProduct);
  });

  it('[POST] - throw exception when product already exists', async () => {
    const response = await request(app).post('/products').send(firstProduct); 
    expect(response.statusCode).toEqual(STATUS_CODE.CONFLICT);
    expect(response.body).toMatchObject({
      error: 'Dois produtos são considerados iguais se os seus skus forem iguais'
    });
  });

  it('[GET] - by SKU', async () => {
    const { statusCode, body: product } = await request(app).get('/products/123');
    expect(statusCode).toEqual(STATUS_CODE.SUCCESS);
    expect(product).toMatchObject({
      ...firstProduct,
      inventory: {
        ...firstProduct.inventory,
        quantity: 11,
      },
      isMarketable: true,
    })
  });

  it('[GET] - all', async () => {
    const { statusCode, body: products } = await request(app).get('/products');
    expect(statusCode).toEqual(STATUS_CODE.SUCCESS);
    expect(products).toHaveLength(2);
    expect(products[0].name).toEqual('Perfume Boticário');
    expect(products[0].isMarketable).toBeTruthy();
    expect(products[0].inventory.quantity).toEqual(11);
    expect(products[1].name).toEqual('Creme Boticário');
    expect(products[1].inventory.quantity).toEqual(0);
    expect(products[1].isMarketable).toBeFalsy();
  });

  it('[PUT] - update firstProduct and change SKU', async () => {
    const warehouse = {
      ...secondProduct.inventory.warehouses[0],
      quantity: 100
    };
    const warehouses = [warehouse];
    const productUpdated: IProduct = {
      ...secondProduct,
      sku: 1000,
      inventory: {
        warehouses,
      },
    };
    const response = await request(app).put('/products/456').send(productUpdated);
    expect(response.statusCode).toEqual(STATUS_CODE.SUCCESS);
    expect(response.body).toEqual(productUpdated);
  });

  it('[PUT] - try change SKU when product already exists', async () => {
    const productUpdated: IProduct = { ...secondProduct, sku: 1000 };
    const response = await request(app).put('/products/123').send(productUpdated);
    expect(response.statusCode).toEqual(STATUS_CODE.CONFLICT);
    expect(response.body).toMatchObject({
      error: 'Dois produtos são considerados iguais se os seus skus forem iguais'
    });
  });

  it('[PUT] - update firstProduct inventory', async () => {
    const warehouse = {
      ...firstProduct.inventory.warehouses[0],
      quantity: 100
    };
    const warehouses = [warehouse, firstProduct.inventory.warehouses[1]];
    const productUpdated: IProduct = {
      ...firstProduct,
      sku: 123,
      inventory: {
        warehouses,
      },
    };
    const response = await request(app).put('/products/123').send(productUpdated);
    expect(response.statusCode).toEqual(STATUS_CODE.SUCCESS);
    expect(response.body).toMatchObject(productUpdated);
    expect(response.body.inventory.warehouses[0].quantity).toEqual(100);
  });

  it('[GET] - product 123 updated', async () => {
    const { statusCode, body: product } = await request(app).get('/products/123');
    expect(statusCode).toEqual(STATUS_CODE.SUCCESS);
    expect(product.inventory.quantity).toEqual(101);
  });

  it('[DELETE] - by SKU', async () => {
    const response = await request(app).delete('/products/1000');
    expect(response.statusCode).toEqual(STATUS_CODE.NO_CONTENT);
  });

  it('[GET] - try get product after delete event', async () => {
    const { statusCode } = await request(app).get('/products/1000');
    expect(statusCode).toEqual(STATUS_CODE.NOT_FOUND);
  });
});
