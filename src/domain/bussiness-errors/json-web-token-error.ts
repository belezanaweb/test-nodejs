import { BussinessError } from './bussiness-error'

export class JsonWebTokenError extends BussinessError {
  constructor () {
    super('Token JWT inválido')
    this.name = 'JsonWebTokenError'
  }
}
