import { IControllerError } from '../../core/errors/controller-error'

export class ServerError extends Error implements IControllerError {
  constructor (reason: string) {
    super(`Server error: ${reason}.`)
    this.name = 'ServerError'
  }
}
