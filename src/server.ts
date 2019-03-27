import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const routes = require('./routes/index');

const app = express();
/**
 * Configuração inicial express
 */
app.use(cors());
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(routes);

// Example error handler
app.use(  (err: any, req: any, res: any, next: any) => {
    if (err.isBoom) {
         return res.status(err.output.statusCode).json(err.output.payload);
    }
    next();
});

export default {app};
