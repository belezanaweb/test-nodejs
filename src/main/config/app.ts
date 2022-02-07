import express from 'express'
import setupSwagger from './config-swagger'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'

const app = express()
setupSwagger(app)
setupMiddlewares(app)
void setupRoutes(app)

export default app
