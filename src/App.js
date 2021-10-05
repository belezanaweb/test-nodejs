import Express from 'express'
import cors from 'cors'
import router from './router/router'

class AppBuilder {
  static create () {
    const app = Express()
    
    this._createConfigurations(app)
    this._addMiddlewares(app)
    this._addRoutes(app)
    
    return app
  }

  static _createConfigurations (app) {
    app.disable('x-powered-by')
  }

  static _addMiddlewares (app) {
    app.use(Express.json())
    app.use(cors())
  }

  static _addRoutes (app) {
    router(app)
  }
}

export default AppBuilder.create()

