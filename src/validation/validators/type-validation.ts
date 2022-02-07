/* eslint-disable valid-typeof */
import { InvalidParamError } from '@/presentation/errors'
import { IValidation } from '@/presentation/protocols'

export class TypeValidation implements IValidation {
  constructor (
    private readonly fieldName: string,
    private readonly fieldType: 'string' | 'number' | 'object' | 'boolean',
    private readonly isArray: boolean = false
  ) {}

  validate (input: any): Error | undefined {
    if (!this.isArray) {
      return this.verifyType(input[this.fieldName])
    } else {
      return this.verifyArrayTypes(input)
    }
  }

  private verifyType (input: any): Error | undefined {
    let formattedInput = input

    // convertendo números para tipos numéricos
    if (this.fieldType === 'number' && !isNaN(input) && input !== true && input !== false) {
      formattedInput = +input
    }

    if ((typeof formattedInput !== this.fieldType) && (formattedInput)) {
      return new InvalidParamError(this.fieldName)
    }
  }

  private verifyArrayTypes (input: any): Error {
    input[this.fieldName] = Array.isArray(input[this.fieldName])
      ? input[this.fieldName]
      : [input[this.fieldName]]

    const errors = input[this.fieldName]
      .map((el: any) => this.verifyType(el))
      .filter((el: any) => el !== undefined)
    return errors.length ? errors[0] : undefined
  }
}
