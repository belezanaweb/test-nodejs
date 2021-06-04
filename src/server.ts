import express, { Application } from 'express';
import cors from 'cors';
import { router } from './router';

export class Server{

  private app: Application;

  constructor(private port = 3000) {
    this.app = express();
  }

  public async init(): Promise<void> {
    this.setupExpress();
  }

  private setupExpress(): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(router);
  }

  public getApp(): Application {
    return this.app;
  }


  public start(): void {
    this.app.listen(this.port, () => {
      console.log('Server listening on port:', this.port);
    });
  }
}

