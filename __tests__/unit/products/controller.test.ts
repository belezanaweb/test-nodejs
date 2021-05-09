import { makeProductController } from './../../../src/api/product/product.factory';
import { STATUS_CODE } from './../../../src/util/types';
import { mockResponse } from './../../../__mocks__/index';
import { ProductController } from './../../../src/api/product/product.controller';

describe('Products Controller', () => {
  let controller: ProductController;
  let response: any;

  beforeEach(() => {
    controller = makeProductController();
    response = mockResponse();
  });

  it('errorResponse', () => {
    const error: any = {
      statusCode: 404,
      message: 'any error'
    };

    controller.errorResponse(response, error);
    expect(response.status).toHaveBeenCalledWith(error.statusCode);
    expect(response.json).toHaveBeenCalledWith({ error: error.message });
  });

  it('errorResponse - without statusCode', () => {
    const error: any = { message: 'any error' };

    controller.errorResponse(response, error);
    expect(response.status).toHaveBeenCalledWith(STATUS_CODE.INTERNAL_ERROR);
    expect(response.json).toHaveBeenCalledWith({ error: error.message });
  });
});
