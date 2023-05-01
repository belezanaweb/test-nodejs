import supertest from 'supertest';

import ProductServiceFactory from '../../src/infrastructure/factories/service/ProductServiceFactory';
import ProductRepositoryMock from '../mocks/ProductRepositoryMock';
import InventoryRepositoryMock from '../mocks/InventoryRepositoryMock';
import WarehouseRepositoryMock from '../mocks/WarehouseRepositoryMock';
import { createdProductMock } from '../mocks/ProductMocks';
import {  NOT_FOUND, OK } from 'http-status';
import { mockServer } from '../helpers';
import { ProductRaw } from '../../src/domain/repositories/ProductRepository';
import NotFoundError from '../../src/domain/exceptions/NotFoundError';

describe('GetOneProductController', () => {
  let server: supertest.SuperTest<supertest.Test>;
  const productRepositoryMock = new ProductRepositoryMock();
  const inventoryRepositoryMock = new InventoryRepositoryMock();
  const warehouseRepositoryMock = new WarehouseRepositoryMock();

  beforeAll(async () => {
    const ProductServerInstance = await ProductServiceFactory.make(productRepositoryMock, inventoryRepositoryMock, warehouseRepositoryMock);
    server = await mockServer({
      productService: ProductServerInstance,
    });
  });

  it('should return 200 OK on get product #integration', async () => {
    productRepositoryMock.getBySku = (): Promise<ProductRaw> => {
      return Promise.resolve(createdProductMock as any as ProductRaw);
    };
    return new Promise((done) => {
      server
        .get(`/product/v1/product/${createdProductMock.sku}`)
        .expect(OK)
        .end((error, response) => {
          expect(error).toBeNull();
          console.log(response.body)
          expect(response.body.isMarketable).toBeTruthy();
          expect(response.body.inventory.quantity).toEqual(15);
          done(undefined);
        });
    });
  });

  it('should return 404 NOT_FOUND when not found product #integration', async () => {
    productRepositoryMock.getBySku = (): Promise<ProductRaw> => {
      return Promise.reject(new NotFoundError('product not found'));
    };
    return new Promise((done) => {
      server
        .get(`/product/v1/product/${createdProductMock.sku}`)
        .expect(NOT_FOUND)
        .end((error, response) => {
          expect(error).toBeNull();
          expect(response.body).toStrictEqual({ error: 'product not found' });
          done(undefined);
        });
    });
  });
});
