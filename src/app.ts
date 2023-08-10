import express from 'express';
import morgan from 'morgan';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/v1', routes);

export default app;
