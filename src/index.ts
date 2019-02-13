import express from 'express';
import { connect } from 'mongoose';
import { MONGODB_URI, PORT } from './config/env';
import { errorHandler } from './modules/errors';
import Products from './modules/products';

const app = express();
const { createProduct, deleteProductBySKU, getProductBySKU, updateProductBySKU } = new Products();

connect(MONGODB_URI, { useNewUrlParser: true });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req: express.Request, res: express.Response) => res.json({ health: true }));
app.post('/products', createProduct);
app.get('/products/:sku', getProductBySKU);
app.put('/products/:sku', updateProductBySKU);
app.delete('/products/:sku', deleteProductBySKU);
app.use(errorHandler);

app.listen(PORT);

export default app;
