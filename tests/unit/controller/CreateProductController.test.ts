import { faker } from '@faker-js/faker';
import { Request, Response } from 'express';
import { BAD_REQUEST, CREATED } from 'http-status';
import Joi from 'joi';

import CreateProductController from '../../../src/application/v1/controller/CreateProductController';
import ProductServiceMock from '../../mocks/ProductServiceMock';
import { productToCreateMock } from '../../mocks/ProductMocks';

describe('CreateProductController', () => {
  const productService = new ProductServiceMock();

  it('should create a product #unit', async () => {
    const uuid = faker.datatype.uuid();
    productService.create = jest.fn().mockImplementation(() => {
      return Promise.resolve(uuid);
    });

    const instance = new CreateProductController(productService);

    const req = { body: productToCreateMock } as unknown as Request;
    const mockJsonResponse = jest.fn();
    const res = {
      status: jest.fn().mockImplementation(() => ({
        json: mockJsonResponse,
      })),
    } as unknown as Response;

    await instance.handler(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(CREATED);
    expect(mockJsonResponse).toHaveBeenCalledWith({ productId: uuid });
  });

  it('should not create a product #unit', async () => {
    const joiSpy = jest.spyOn(Joi, 'assert').mockImplementationOnce(() => {
      throw { details: [{ message: 'validation error' }] };
    });

    const instance = new CreateProductController(productService);

    const req = { body: productToCreateMock } as unknown as Request;
    const mockJsonResponse = jest.fn();
    const res = {
      status: jest.fn().mockImplementation(() => ({
        json: mockJsonResponse,
      })),
    } as unknown as Response;

    await instance.handler(req, res, jest.fn());
    expect(joiSpy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(BAD_REQUEST);
    expect(mockJsonResponse).toHaveBeenCalledWith({ error: 'validation error' });
  });
});
