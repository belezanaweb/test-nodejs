import { json, urlencoded } from 'body-parser';
import express, { Application } from 'express';
import { useContainer, useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';

import { ErrorHandlerMiddleware } from './api/middlewares/ErrorHandlerMiddleware';
import { NotFoundHandlerMiddleware } from './api/middlewares/NotFoundHandlerMiddleware';
import config from './config';
import MemoryDb from './database/MemoryDb';

export class Server {
  app: Application;

  constructor() {
    this.app = express();

    this.setupDatabase();
    this.setupMiddlewares();
    this.setupControllers();
  }

  start(port: number): void {
    this.app.listen(port);
  }

  private setupDatabase(): void {
    const db = new MemoryDb();

    Object.keys(config.collections).forEach((collection: string): void =>
      db.addCollection(collection),
    );
  }

  private setupMiddlewares(): void {
    this.app.use(json());
    this.app.use(urlencoded({ extended: false }));
  }

  private setupControllers(): void {
    useContainer(Container);

    const controllers = [`${__dirname}/api/controllers/*`];
    const middlewares = [NotFoundHandlerMiddleware, ErrorHandlerMiddleware];

    useExpressServer(this.app, {
      cors: true,
      defaultErrorHandler: false,
      controllers,
      middlewares,
    });
  }
}
