import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Redis from './config/redis';

const app = express();
const redis = new Redis();
/**
 * Configuração inicial express
 */
app.use(cors());
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

//inicializando o redis;
redis.initialize();

export default {app, redis};
