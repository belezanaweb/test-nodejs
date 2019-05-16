const http = require('http')
const port = process.env.PORT || '8080'

const fn = (app) => {
  const server = http.createServer(app)
  server.listen(port)
  server.on('listening', () => {
    console.log(`listening on port ${port}`)
  })
}

module.exports = fn
