module.exports = class DuplicatedKeyError extends Error {
  constructor (params) {
    super(`Duplicated key: ${params}`)
    this.name = DuplicatedKeyError.name
    this.statusCode = 400
  }
}
