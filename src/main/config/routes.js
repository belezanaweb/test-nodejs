const { readdirSync } = require('fs')
const path = require('path')

module.exports = app => {
  const routes = path.join(__dirname, '..', 'routes')
  readdirSync(routes).forEach(async version => {
    app.use(`/api/${version}`, await require(path.join(routes, version)))
    app.get(`/api/${version}`, (_, res) => { res.json({ version }) })
  })
}
