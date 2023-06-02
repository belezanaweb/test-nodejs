const app = require('./config/app')

app.listen(process.env.PORT || 3000, () => {
  console.info('server listening')
})
