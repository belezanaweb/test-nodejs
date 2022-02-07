export class UnauthorizedError extends Error {
  constructor () {
    super('Acesso não autorizado')
    this.name = 'UnauthorizedError'
  }
}
