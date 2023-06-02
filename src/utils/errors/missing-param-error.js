module.exports = class MissingParamError extends Error {
  constructor (paramName) {
    super(`Missing param: ${paramName}`)
    this.name = MissingParamError.name
    this.statusCode = 400
  }
}
