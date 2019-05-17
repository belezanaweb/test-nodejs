const Joi = require('./joi')

const execute = (schema) => {
  return (req, res, next) => {
    let err = runValidate(req.body, schema)

    if (err.error) {
      res
      .status(400)
      .send(err.error)
    } else {
      return next()
    }
  }
}

const runValidate = (body, schema) => {
  return Joi.validate(body, schema, {
    abortEarly: false
  })
}


module.exports = { execute, Joi, runValidate }