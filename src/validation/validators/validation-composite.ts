import { IValidation } from '@/presentation/protocols'

export class ValidationComposite implements IValidation {
  constructor (private readonly validations: IValidation[]) {}

  validate (input: any): Error | undefined {
    for (const validation of this.validations) {
      const error = validation.validate(input)
      if (error) {
        return error
      }
    }
  }
}
