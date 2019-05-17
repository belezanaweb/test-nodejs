const ErrorPoc = require('./CustomError')

const errors = {
  getErrorInstance () {
    return new ErrorPoc()
  },

  buildError (code, message) {
    let error = errors.getErrorInstance()
    error.addError(code, message)
    return error
  }
}

module.exports = errors
