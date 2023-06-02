module.exports = class UnauthorizedError extends Error {
  constructor () {
    super('Unauthorized')
    this.name = UnauthorizedError.name
    this.statusCode = 401
  }
}
