import {RequestHandler} from 'express'

type Methods = 'post' | 'get' | 'put' | 'patch' | 'delete';

export interface Router {
  prefix: string;
  controllers: Controller[];
}

export interface Controller {
  method: Methods;
  path: string;
  handler: RequestHandler;
}

export abstract class ControllerBase implements Controller {
  public method: Methods;
  public path: string;
  public handler: RequestHandler;

  constructor(method: Methods, path: string) {
    this.method = method;
    this.path = path;
    this.handler = {} as RequestHandler;
  }

  protected setHandler(handler: RequestHandler): void {
    this.handler = handler;
  }
}
