import { IControllerError } from '../../core/errors/controller-error'

export class InvalidParamError extends Error implements IControllerError {
  constructor (paramName: string, expectedType: string) {
    super(`Invalid Param: expect ${paramName} to be a valid ${expectedType}`)
    this.name = 'InvalidParamError'
  }
}
