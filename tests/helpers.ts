import supertest from 'supertest';
import { RequestHandler } from 'express';
import bodyParser from 'body-parser';

import App from '../src/application/App';
import { AppConfig } from '../src/config/AppConfig';
import CreateProductControllerFactory from '../src/infrastructure/factories/controller/CreateProductControllerFactory';
import GetOneProductControllerFactory from '../src/infrastructure/factories/controller/GetOneProductControllerFactory';
import UpdateProductControllerFactory from '../src/infrastructure/factories/controller/UpdateProductControllerFactory';
import DeleteProductControllerFactory from '../src/infrastructure/factories/controller/DeleteProductControllerFactory';
import { Router } from '../src/application/Controller';
import {IProductService} from '../src/service/ProductService';
import { IProductRepository } from '../src/domain/repositories/ProductRepository';
import ProductServiceMock from './mocks/ProductServiceMock';

interface MockServerOptions {
  productService?: IProductService;
  productRepository?: IProductRepository;
}

const routerV1 = async (options: MockServerOptions): Promise<Router> => {
  const productService = options.productService || new ProductServiceMock();
  return {
    prefix: '/product/v1',
    controllers: [
      await CreateProductControllerFactory.make(productService),
      await GetOneProductControllerFactory.make(productService),
      await UpdateProductControllerFactory.make(productService),
      await DeleteProductControllerFactory.make(productService),
    ],
  };
};

export const mockApp = async (options: MockServerOptions): Promise<App> => {
  const middlewares: RequestHandler[] = [];

  middlewares.push(bodyParser.json());

  return new App({
    port: AppConfig.APP_PORT,
    name: AppConfig.APPLICATION_NAME,
    routers: [await routerV1(options)],
    middlewares,
    environment: AppConfig.APP_ENVIRONMENT,
  });
};

export const mockServer = async (options: MockServerOptions): Promise<supertest.SuperTest<supertest.Test>> => {
  const app = await mockApp(options);
  return supertest(app.app);
};
