const awilix = require('awilix');
const container = awilix.createContainer();

const Config = require('../config');
const Server = require('../src/interfaces/http/Server');
const Application = require('./app/Application');
const Router = require('../src/interfaces/http/Router');
const sequelize = require('./infra/database/models');

container
  .register({
    config: awilix.asValue(Config),
    container: awilix.asValue(container),
    server: awilix.asClass(Server).singleton(),
    application: awilix.asClass(Application).singleton(),
    router: awilix.asFunction(Router).singleton(),
    sequelize: awilix.asFunction(sequelize).singleton()
  })
  .loadModules(
    [
      'src/interfaces/http/middlewares/**/*.js',
      'src/interfaces/http/controllers/**/*.js',
      'src/infra/repositories/**/*.js',
      'src/infra/errors/**/*.js',
      'src/app/operations/**/*.js',
      'src/app/usecases/**/*.js',
      'src/domain/**/*.js'
    ],
    {
      formatName: 'camelCase',
      resolverOptions: {
        injectionMode: awilix.InjectionMode.PROXY,
        lifetime: awilix.Lifetime.SINGLETON
      }
    }
  );

module.exports = container;
