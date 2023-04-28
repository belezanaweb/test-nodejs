const awilix = require('awilix');
const container = awilix.createContainer();

const Config = require('../config');
const Server = require('../src/interfaces/http/Server');
const Application = require('./app/Application');
const Router = require('../src/interfaces/http/Router');

container
  .register({
    config: awilix.asValue(Config),
    container: awilix.asValue(container),
    server: awilix.asClass(Server).singleton(),
    application: awilix.asClass(Application).singleton(),
    router: awilix.asFunction(Router).singleton()
  })
  .loadModules(['src/interfaces/http/middlewares/**/*.js', 'src/interfaces/http/controllers/**/*.js'], {
    formatName: 'camelCase',
    resolverOptions: {
      injectionMode: awilix.InjectionMode.PROXY,
      lifetime: awilix.Lifetime.SINGLETON
    }
  });

module.exports = container;
