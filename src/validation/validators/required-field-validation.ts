import { MissingParamError } from '@/presentation/errors'
import { IValidation } from '@/presentation/protocols'

export class RequiredFieldValidation implements IValidation {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error | undefined {
    if (!input[this.fieldName] && typeof input[this.fieldName] !== 'boolean' && typeof input[this.fieldName] !== 'number') {
      return new MissingParamError(this.fieldName)
    }
  }
}
