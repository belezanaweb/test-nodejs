import { IValidation } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { TypeValidation } from '@/validation/validators/type-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'

const makePutProductValidation = (): IValidation => {
  const validations: IValidation[] = []

  // RequiredFieldValidation
  validations.push(new RequiredFieldValidation('productId'))
  validations.push(new RequiredFieldValidation('sku'))
  validations.push(new RequiredFieldValidation('name'))
  validations.push(new RequiredFieldValidation('inventory'))

  // TypeValidation
  validations.push(new TypeValidation('productId', 'number', false))
  validations.push(new TypeValidation('sku', 'number', false))
  validations.push(new TypeValidation('name', 'string', false))
  validations.push(new TypeValidation('inventory', 'object', false))

  return new ValidationComposite(validations)
}
export const putProductValidation = makePutProductValidation()

const makePutProductInventoryValidation = (): IValidation => {
  const validations: IValidation[] = []

  validations.push(new RequiredFieldValidation('warehouses'))
  validations.push(new TypeValidation('warehouses', 'object', true))

  return new ValidationComposite(validations)
}
export const putProductInventoryValidation = makePutProductInventoryValidation()

const makePutProductWarehouseValidation = (): IValidation => {
  const validations: IValidation[] = []

  // RequiredFieldValidation
  validations.push(new RequiredFieldValidation('locality'))
  validations.push(new RequiredFieldValidation('quantity'))
  validations.push(new RequiredFieldValidation('type'))

  // TypeValidation
  validations.push(new TypeValidation('locality', 'string', false))
  validations.push(new TypeValidation('quantity', 'number', false))
  validations.push(new TypeValidation('type', 'string', false))

  return new ValidationComposite(validations)
}
export const putProductWarehouseValidation = makePutProductWarehouseValidation()
