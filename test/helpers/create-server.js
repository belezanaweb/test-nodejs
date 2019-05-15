const http = require('http')
const supertest = require('supertest')
const createServer = require('../../server/create-server')

let _server, _agent
const startTestServer = async () => {
  const app = createServer()
  _server = http.createServer(app.callback())
  await new Promise((resolve, reject) => _server.listen(0, err => (err ? reject(err) : resolve())))
  const agent = supertest(_server)
  agent.app = app
  return agent
}

const notDone = () => undefined

const cleanCachedServer = (done = notDone) => {
  if (_server) {
    _server.close()
  }
  _agent = null
  _server = null
  done()
}

const getTestServer = async ({ useCachedServer = true } = {}) => {
  if (useCachedServer) {
    after(cleanCachedServer)
  } else {
    cleanCachedServer()
    afterEach(cleanCachedServer)
  }
  return _agent || (_agent = await startTestServer())
}

module.exports = getTestServer
