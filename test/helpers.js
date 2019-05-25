const app = require('app');

global.request = require('supertest')(app);
global.assert = require('assert');
