import { Response, Request } from 'express';
import ProductController from '../../src/api/Product/ProductController';
import { IProduct } from '../../src/api/Product/ProductRepository';

const findAll = jest.fn();
const insert = jest.fn();
const findBySku = jest.fn();
const deleteMock = jest.fn();

jest.mock('../../src/api/Product/ProductRepository',
  () => jest.fn().mockImplementation(() => {
    return {
      findAll,
      insert,
      delete:deleteMock,
      findBySku
    };
  })
);

const mockResponse = () => {
  const res: any = {} ;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

const mockRequest = (props : any ) => {
  return props as Request;
};

describe('Product Controller', () => {
  describe('.index', () => {
    it('should return ProductRepository.findAll result', () => {
      findAll.mockReturnValueOnce([1,2]);
      const controller = new ProductController();
      const responseMocked = mockResponse();
      const requestMocked = mockRequest({});

      controller.index(requestMocked, responseMocked);

      expect(responseMocked.json).toBeCalledWith([1,2]);
    });
  });

  describe('.insert', () => {
    it('should call ProductRepository.insert with body data', () => {
      insert.mockReturnValueOnce(undefined);
      const body = {
        name : 'Product Name',
      }
      const controller = new ProductController();
      const responseMocked = mockResponse();
      const requestMocked = mockRequest({ body });

      controller.store(requestMocked, responseMocked);
      expect(insert).toBeCalledWith(body)
      expect(responseMocked.json).toBeCalledWith(body);
      expect(responseMocked.status).toBeCalledWith(201);
    });
  });

  describe('.show', () => {
    it('should return ProductRepository.getBySku', () => {
      const product:IProduct = {
        name : 'product name',
        sku: 123,
        inventory : {
          warehouses: []
        }
      }
      findBySku.mockReturnValueOnce(product);
      const params = {
        sku : 123,
      }
      const controller = new ProductController();
      const responseMocked = mockResponse();
      const requestMocked = mockRequest({ params });

      controller.show(requestMocked, responseMocked);
      expect(findBySku).toBeCalledWith(123)
      expect(responseMocked.json).toBeCalledWith(product);
    });

    it('should return status 404 when findBySku is empty', () => {

      findBySku.mockReturnValueOnce(undefined);
      const params = {
        sku : 123,
      }
      const controller = new ProductController();
      const responseMocked = mockResponse();
      const requestMocked = mockRequest({ params });

      controller.show(requestMocked, responseMocked);
      expect(findBySku).toBeCalledWith(123)
      expect(responseMocked.json).toBeCalledWith({message : 'Product not found' });
    });
  });

  describe('.delete', () => {
    it('should call ProductRepository.delete', () => {
      deleteMock.mockReturnValueOnce(undefined);
      const params = {
        sku : 123,
      }
      const controller = new ProductController();
      const responseMocked = mockResponse();
      const requestMocked = mockRequest({ params });

      controller.delete(requestMocked, responseMocked);
      expect(deleteMock).toBeCalledWith(123)
      expect(responseMocked.status).toBeCalledWith(204);
    });
  });
})
