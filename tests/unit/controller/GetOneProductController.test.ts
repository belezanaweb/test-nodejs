import { Request } from 'express';
import { BAD_REQUEST, NOT_FOUND, OK } from 'http-status';

import GetOneProductController from '../../../src/application/v1/controller/GetOneProductController';
import ProductServiceMock from '../../mocks/ProductServiceMock';
import { productMock } from '../../mocks/ProductMocks';
import NotFoundError from '../../../src/domain/exceptions/NotFoundError';
import Product from '../../../src/domain/entities/Product';

describe('GetOneProductController', () => {
  const productService = new ProductServiceMock();

  it('should get one a product by sku #unit', async () => {
    productService.getBySku = jest.fn().mockImplementation((): Promise<Product> => {
      return Promise.resolve(productMock as Product);
    });

    const instance = new GetOneProductController(productService);

    const req = {
      params: {
        sku: productMock.sku,
      },
    } as unknown as Request;
    const mockJsonResponse = jest.fn();
    const res: any = {
      status: jest.fn().mockImplementation(() => ({
        send: jest.fn(),
        json: mockJsonResponse,
      })),
    };

    await instance.handler(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(OK);
    expect(mockJsonResponse).toHaveBeenCalledWith(productMock);
  });

  it('should not get a product when the product not found #unit', async () => {
    productService.getBySku = jest.fn().mockImplementation((): Promise<void> => {
      return Promise.reject(new NotFoundError('product not found'));
    });
    const instance = new GetOneProductController(productService);

    const req = {
      params: {
        sku: productMock.sku,
      },
    } as unknown as Request;
    const mockJsonResponse = jest.fn();
    const res: any = {
      status: jest.fn().mockImplementation(() => ({
        send: jest.fn(),
        json: mockJsonResponse,
      })),
    };

    await instance.handler(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(NOT_FOUND);
    expect(mockJsonResponse).toHaveBeenCalledWith({ error: 'product not found' });
  });

  it('should not get a product when the product sku is a invalid number #unit', async () => {
    productService.delete = jest.fn().mockImplementation((): Promise<void> => {
      return Promise.resolve();
    });
    const instance = new GetOneProductController(productService);

    const req = {
      params: {
        sku: 'invalidNumber',
      },
    } as unknown as Request;
    const mockJsonResponse = jest.fn();
    const res: any = {
      status: jest.fn().mockImplementation(() => ({
        send: jest.fn(),
        json: mockJsonResponse,
      })),
    };

    await instance.handler(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(BAD_REQUEST);
    expect(mockJsonResponse).toHaveBeenCalledWith({ error: '"value" must be a number' });
  });
});
