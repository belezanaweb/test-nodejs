
export class ServerError extends Error {
  dbError?: string

  constructor (stack: string, dbError?: string) {
    super('Erro interno no servidor! Tente novamente em alguns minutos')
    this.name = 'ServerError'
    this.stack = stack
    this.dbError = dbError
  }
}
