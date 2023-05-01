import { faker } from '@faker-js/faker';
import { Request, Response } from 'express';
import { BAD_REQUEST, NO_CONTENT } from 'http-status';
import Joi from 'joi';

import DeleteProductController from '../../../src/application/v1/controller/DeleteProductController';
import ProductServiceMock from '../../mocks/ProductServiceMock';

describe('DeleteProductController', () => {
  const productService = new ProductServiceMock();

  it('should delete a product #unit', async () => {
    const sku = faker.datatype.number();
    productService.delete = jest.fn().mockImplementation();

    const instance = new DeleteProductController(productService);

    const req = { params: { sku } } as unknown as Request;
    const res = {
      status: jest.fn().mockImplementation(() => ({
        send: jest.fn(),
      })),
    } as unknown as Response;

    await instance.handler(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(NO_CONTENT);
  });

  it('should not delete a product #unit', async () => {
    const joiSpy = jest.spyOn(Joi, 'assert').mockImplementationOnce(() => {
      throw { details: [{ message: 'value must be a number' }] };
    });

    const instance = new DeleteProductController(productService);

    const req = { params: { sku: 'invalidNumber' } } as unknown as Request;
    const mockJsonResponse = jest.fn();
    const res = {
      status: jest.fn().mockImplementation(() => ({
        json: mockJsonResponse,
      })),
    } as unknown as Response;

    await instance.handler(req, res, jest.fn());
    expect(joiSpy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(BAD_REQUEST);
    expect(mockJsonResponse).toHaveBeenCalledWith({ error: 'value must be a number' });
  });
});
