import routes from './routes'

export default app => {
  routes.forEach(route => route(app))
}
