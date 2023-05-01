import { faker } from '@faker-js/faker';
import { Request, Response } from 'express';
import { BAD_REQUEST, OK } from 'http-status';
import Joi from 'joi';

import UpdateProductController from '../../../src/application/v1/controller/UpdateProductController';
import ProductServiceMock from '../../mocks/ProductServiceMock';
import { productToUpdateMock, createdProductMock } from '../../mocks/ProductMocks';

describe('UpdateProductController', () => {
  const productService = new ProductServiceMock();

  it('should update a offer #unit', async () => {
    const sku = faker.datatype.number();
    productService.update = jest.fn().mockImplementation(() => {
      return Promise.resolve(createdProductMock);
    });

    const instance = new UpdateProductController(productService);

    const req = { body: productToUpdateMock, params: { sku } } as unknown as Request;
    const mockJsonResponse = jest.fn();
    const res = {
      status: jest.fn().mockImplementation(() => ({
        json: mockJsonResponse,
      })),
    } as unknown as Response;

    await instance.handler(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(OK);
    expect(mockJsonResponse).toHaveBeenCalledWith(createdProductMock);
  });

  it('should not update offer #unit', async () => {
    const sku = faker.datatype.number();
    const joiSpy = jest.spyOn(Joi, 'assert').mockImplementationOnce(() => {
      throw { details: [{ message: 'validation error' }] };
    });

    const instance = new UpdateProductController(productService);

    const req = { body: productToUpdateMock, params: { sku } } as unknown as Request;
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
