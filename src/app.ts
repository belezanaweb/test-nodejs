import { applyRoutes } from './utils/index';
import express from 'express';
import routes from './routes';

const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

applyRoutes(routes, app);

export = app