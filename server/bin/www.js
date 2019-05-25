const app = require('../app')
const debug = require('debug')('wbruno:www')

app.listen(app.get('port'), () => {
  debug('server is up')
})
