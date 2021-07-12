import express from 'express';
import { ErrorHandler } from './middleware/error-handler';
import ProductRouter from './router/product-router';

class Application {

    public app: express.Application;

    constructor() {
        this.app = express();
        
        this.setMiddlewaresBefore();
        this.setRoutes();
        this.setMiddlewaresAfter();
    }
    
    private setRoutes() {
        this.app.use('/', ProductRouter);
    }

    private setMiddlewaresBefore() {
        this.app.use(express.json({ limit: '10mb' }));
    }

    private setMiddlewaresAfter() {
        this.app.use(ErrorHandler.handle);
    }

}

export default new Application().app;
