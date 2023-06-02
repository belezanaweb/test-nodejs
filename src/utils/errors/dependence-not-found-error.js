module.exports = class DependenceNotFoundError extends Error {
  constructor () {
    super('Dependence not found')
    this.name = DependenceNotFoundError.name
    this.statusCode = 500
  }
}
