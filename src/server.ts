import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { default as routes } from './routes/index';

const app = express();
/**
 * Configuração inicial express
 */
app.use(cors());
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(routes.produtoRouter)

export default {app};
