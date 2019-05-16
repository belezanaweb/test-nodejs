const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')

module.exports = ({ apis, app }) => {
  const { version, description } = require('../../../package.json')
  const swaggerDefinition = {
    info: {
      title: process.env.LAUNCHER_NAME,
      version: version,
      description: description
    },
    basePath: '/'
  }

  const options = {
    swaggerDefinition: swaggerDefinition,
    apis
  }

  const swaggerSpec = swaggerJSDoc(options)

  const swaggerModule = {
    config: (req, res, next) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(swaggerSpec)
    },
    ui: swaggerUi.setup(swaggerSpec)
  }

  app.get('/json', swaggerModule.config)
  app.use('/swagger', swaggerUi.serve, swaggerModule.ui)
  app.get('/', (req, res, next) => res.redirect('/swagger'))
}
