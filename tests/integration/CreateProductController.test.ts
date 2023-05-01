import supertest from 'supertest';

import ProductServiceFactory from '../../src/infrastructure/factories/service/ProductServiceFactory';
import ProductRepositoryMock from '../mocks/ProductRepositoryMock';
import InventoryRepositoryMock from '../mocks/InventoryRepositoryMock';
import WarehouseRepositoryMock from '../mocks/WarehouseRepositoryMock';
import { createdProductMock } from '../mocks/ProductMocks';
import { BAD_REQUEST, CREATED } from 'http-status';
import { mockServer } from '../helpers';

describe('CreateProductController', () => {
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

  it('should return 201 CREATED whith a product id #integration', async () => {
    productRepositoryMock.create = (): Promise<string> => {
      return Promise.resolve(createdProductMock.productId);
    };

    return new Promise((done) => {
      server
        .post('/product/v1/product')
        .send({
          name: createdProductMock.name,
          sku: createdProductMock.sku,
          inventory: {
            warehouses: createdProductMock.inventory.warehouse.map((warehouse) => {
              return {
                locality: warehouse.locality,
                quantity: warehouse.quantity,
                type: warehouse.type
              }
            })
          },
        })
        .expect(CREATED)
        .end((error, response) => {
          expect(error).toBeNull();
          expect(response.body.productId).toBeDefined();
          done(undefined);
        });
    });
  });


  it('shoud return 400 BAD_REQUEST when the requisition body is invalid', async () => {
    const response = await server
      .post('/product/v1/product')
      .send({
        name: createdProductMock.name,
        sku: "invalid Sku",
        inventory: {
          warehouses: createdProductMock.inventory.warehouse.map((warehouse) => {
            return {
              locality: warehouse.locality,
              quantity: warehouse.quantity,
              type: warehouse.type
            }
          })
        },
      })
      .expect(BAD_REQUEST);
    expect(response.status).toEqual(BAD_REQUEST);
    expect(response.body.error).toBe('"sku" must be a number');
  });
});
