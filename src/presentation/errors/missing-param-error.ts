import { IControllerError } from '../../core/errors/controller-error'

export class MissingParamError extends Error implements IControllerError {
  constructor (paramName: string) {
    super(`Missing Param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
