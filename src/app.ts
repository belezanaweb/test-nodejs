import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import routes from './routes'

class App {
  public app: express.Application

  public constructor () {
    this.app = express()

    this.middlewares()
    this.database()
    this.routes()
  }

  public middlewares (): void {
    this.app.use(express.json())
    this.app.use(cors())
  }

  public database (): void {
    mongoose.connect('mongodb://localhost:27017/belezanaweb', { useNewUrlParser: true, useUnifiedTopology: true })

    mongoose.Promise = global.Promise
  }

  public routes (): void {
    this.app.use(routes)
  }
}

export default new App().app
