const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');

const api = express();

api.use(cors({
	origin: '*',
	exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
	maxAge: 5,
	credentials: true,
	allowMethods: ['GET', 'POST', 'UPDATE', 'PUT', 'PATCH', 'DELETE'],
	allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

api.use(bodyParser.json());
api.use(bodyParser.json({ type: 'apilication/vnd.api+json' }));
api.use(bodyParser.urlencoded({extended: true}));

api.use(expressValidator());

consign()
	.include('app/routes')
	.then('app/controllers')
	.then('app/dataBaseMongo/conectaBanco')
	.into(api);

module.exports = api;