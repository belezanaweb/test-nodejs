import express, { Express } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import cors from 'cors';
import helmet from 'helmet';
import { errors } from 'celebrate';
import '../../container';

import mainRoute from './routes/index';
import error from './middlewares/error';
import healthRoutes from './routes/health';

class App {
  private expressApp: Express;

  constructor() {
    this.expressApp = express();

    this.routes();
    this.middlewares();
  }

  private async middlewares() {
    this.expressApp.use(helmet());
    this.expressApp.use(cors());
    this.expressApp.use(error);
    this.expressApp.use(errors({ statusCode: 400 }));
  }

  private routes() {
    this.expressApp.use(express.json());
    this.expressApp.use('/api', healthRoutes);
    this.expressApp.use('/api', mainRoute);
  }

  public async startApp(port?: string): Promise<void> {
    this.expressApp.listen(port, () => {
      console.log(`Server is running... at ${port}`);
    });
  }

  public stopApp(): void {
    this.expressApp.listen().close();
  }

  public getApp(): Express {
    return this.expressApp;
  }
}

export default App;
