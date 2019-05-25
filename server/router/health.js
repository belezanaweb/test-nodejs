const router = require('express').Router()


router.get('/', (request, response, next) => {
  response.send('OK')
})

module.exports = router
