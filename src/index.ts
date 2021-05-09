import express, { Router } from 'express';
import productRoutes from './api/product/product.routes';

const app = express();
const router = Router();

router.use('/products', productRoutes);

app.use(express.json());
app.use(router);
app.listen(process.env.PORT || 8000);

export default app;
