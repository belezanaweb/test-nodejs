const Joi = require('./joi')

const execute = (schema) => {
  return (req, res, next) => {
    let err = Joi.validate(req.body, schema, {
      abortEarly: false
    })

    if (err.error) {
      res
      .status(400)
      .send(err.error)
    } else {
      return next()
    }
  }
}


module.exports = { execute, Joi }