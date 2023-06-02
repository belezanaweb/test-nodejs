module.exports = class NotFoundError extends Error {
  constructor () {
    super('Not Found')
    this.name = NotFoundError.name
    this.statusCode = 404
  }
}
