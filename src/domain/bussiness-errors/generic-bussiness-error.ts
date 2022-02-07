import { BussinessError } from './bussiness-error'

export class GenericBussinessError extends BussinessError {
  constructor (errorMsg: string) {
    super(errorMsg)
    this.name = 'GenericBussinessError'
  }
}
