import express from 'express';
import ProductRoutes from './api/Product/Routes';
import ErrorHandler from './api/ErrorHandler';

const app = express();

app.use(express.json());

app.use('/product', ProductRoutes);

app.use(ErrorHandler);

app.listen(8080)
