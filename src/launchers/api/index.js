//
// Setup API
//
const app = require('integrations/express')

const bs = process.env.BASE_API_PATH || '/api'
app.use(`${bs}/product`, require('modules/product'))

require('integrations/http')(app)

//
// Setup swagger
//

const swaggerModule = require('integrations/swagger')({
    apis: [
        `./src/integrations/express/error-hander/*.js`,
        `./src/modules/product/swagger/*.js`,
    ],
    app: app
})
