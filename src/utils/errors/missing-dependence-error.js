module.exports = class MissingDependenceError extends Error {
  constructor (dependenceName) {
    super(`Missing dependence: ${dependenceName}`)
    this.name = MissingDependenceError.name
    this.statusCode = 500
  }
}
