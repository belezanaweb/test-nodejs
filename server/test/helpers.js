global.absoluteRequire = name => require(`${__dirname}/../app/${name}`);

const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiThings = require('chai-things');
const constants = absoluteRequire('modules/constants');

chai.should();
chai.use(chaiThings);
chai.use(chaiHttp);

global.expect = chai.expect;
global.request = chai.request;
global.constants = constants;
