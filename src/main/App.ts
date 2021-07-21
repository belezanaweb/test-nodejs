import express, { Application } from 'express';

import {
    BodyParserMiddleware,
    RequestLoggerMiddleware,
} from './middlewares';
import {
    Docs,
    RoutesV1,
} from './routes';

const app: Application = express();

app.set('host', process.env.APP_HOST || '0.0.0.0');
app.set('port', process.env.APP_PORT || 3000);

app.use(BodyParserMiddleware);
app.use(RequestLoggerMiddleware);

app.get('/', (_, res) => res.send('Server is running! 🚀'));
app.use('/docs', ...Docs);
app.use('/v1', RoutesV1);

export default app;
