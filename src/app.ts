import fastify from 'fastify'
import { productsRoutes } from './routes/product.routes'

const app = fastify()

app.register(productsRoutes, { prefix: '/products' })

export default app
