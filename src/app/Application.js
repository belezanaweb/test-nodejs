class Application {
  /**
   * @param {Object} ctx - Dependency Injection
   * @param {import('config')} ctx.config
   * @param {import('src/interfaces/http/Server')} ctx.server
   */
  constructor({ config, server }) {
    this.config = config;
    this.server = server;
  }

  async start() {
    this.server.start();
  }
}

module.exports = Application;
