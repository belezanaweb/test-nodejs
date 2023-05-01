import { RequestHandler } from "express";
import bodyParser from "body-parser";

import App from "../../application/App";
import { Router } from "../../application/Controller";
import { AppConfig } from "../../config/AppConfig";


export default class AppFactory {
  static async make(routerV1: () => Promise<Router>): Promise<App> {
    const middlewares: RequestHandler[] = [];

    middlewares.push(bodyParser.json());

    return new App({
      port: AppConfig.APP_PORT,
      name: AppConfig.APPLICATION_NAME,
      middlewares,
      routers: [await routerV1()],
      environment: AppConfig.APP_ENVIRONMENT
    });
  }
}
