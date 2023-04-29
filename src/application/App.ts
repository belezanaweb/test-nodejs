import express, { RequestHandler } from "express";
import {NOT_FOUND} from 'http-status';
import * as http from 'http';

import { Router } from "./Controller";

interface AppOptions {
  port: number;
  name: string;
  middlewares?: RequestHandler[];
  routers: Router[];
  enviroment: string;
}

export default class App {
  app: express.Express;
  port: number;
  name: string;
  middlewares: RequestHandler[];
  routers: Router[];
  enviroment: string;

  constructor(options: AppOptions) {
    this.app = express();
    this.port = options.port;
    this.name = options.name;
    this.middlewares = options.middlewares || [];
    this.routers = options.routers;
    this.enviroment = options.enviroment || '';

    this.handleMiddlewares();
    this.handleRoutes();
    this.handleNotFound();
  }

  private handleMiddlewares(): void {
    this.middlewares.forEach(middleware => this.app.use(middleware))
  }

  private handleRoutes(): void {
    this.routers.forEach((router) => {
      const expressRouter = express.Router();
      router.controllers.forEach((controller) => {
        expressRouter[controller.method](controller.path, controller.handler);
      });
      this.app.use(router.prefix, expressRouter);
    })
  }

  private handleNotFound(): void {
    this.app.use((_request, response) => {
      response.status(NOT_FOUND).json({error: 'nor found'})
    })
  }

  async listen(): Promise<http.Server> {
    return this.app.listen(this.port, () => {
      console.log(`Aplication ${this.name} is running. Listen on http://localhost:${this.port}`);
      console.log('Press CTRL+C to exit');
    })
  }
}
