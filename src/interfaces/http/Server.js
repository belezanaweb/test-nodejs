const { scopePerRequest } = require('awilix-express');
const express = require('express');

class Server {
  /**
   * @param {Object} ctx - Context Dependency Injection
   * @param {import('src/container')} ctx.container
   * @param {import('config')} ctx.config
   */
  constructor({ container, config, router }) {
    this.config = config;
    this.express = express();
    this.express.use(scopePerRequest(container));
    this.express.use(router);
  }

  initServer() {
    const { APP_PORT, NODE_ENV } = process.env;

    return this.express.listen(APP_PORT, () => {
      console.log(`Server started on port: ${APP_PORT} - Environment: ${NODE_ENV}`);
    });
  }

  start() {
    this.initServer();
  }
}

module.exports = Server;
