import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Constants from './constants'
const routes = require('./routes/index');

const app = express();
/**
 * Configuração inicial express
 */
app.use(cors());
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(routes);

// Tratamento de erro Joi
app.use(  (err: any, req: any, res: any, next: any) => {
    if (err.isBoom) {
         return res.status(err.output.statusCode).json(err.output.payload);
    }
    next();
});

app.use((req, res, next) => {
    res.status(404).json({message: Constants.NOT_FOUND});
});

export default {app};
