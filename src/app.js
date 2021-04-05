import Express from 'express'
import cors from 'cors'
import 'dotenv/config'
import RouteManager from './router/RouteManager'
import ProductRoute from './router/ProductRoute'


const app = Express()

app.disable('x-powered-by')
app.use(Express.urlencoded({ extended: true }))
app.use(Express.json())

app.use(cors())

RouteManager(app)
// ProductRoute(app)


export default app
