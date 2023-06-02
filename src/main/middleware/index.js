const cors = require('./cors')
const helmet = require('./helmet')
const jsonParser = require('./json-parser')

module.exports = app => {
  app.use(cors)
  app.use(jsonParser)
  app.use(helmet())
}
