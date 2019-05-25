const router = require('express').Router()


router.get('/', (request, response) => {
  response.send('OK')
})

module.exports = router
