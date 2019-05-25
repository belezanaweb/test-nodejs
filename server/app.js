const app = require('express')()
const bodyParser = require('body-parser')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000)
app.use(require('./router'))


app.use((request, response, next) => {
  let err = new Error('not found')
  err.status = 404
  next(err)
})
app.use((err, request, response, next) => {
  let status = err.status || 500

  response.status(status).json({ message: err.message })
})

module.exports = app
