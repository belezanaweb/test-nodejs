import { IValidation } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { TypeValidation } from '@/validation/validators/type-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'

const makeGetProductByIdValidation = (): IValidation => {
  const validations: IValidation[] = []

  validations.push(new RequiredFieldValidation('productId'))
  validations.push(new TypeValidation('productId', 'number', false))

  return new ValidationComposite(validations)
}
export const getProductByIdValidation = makeGetProductByIdValidation()
