import { IValidation } from '@/presentation/protocols'
import { ValidationComposite } from '@/validation/validators/validation-composite'
import faker from 'faker/locale/pt_BR'
import { mock, MockProxy } from 'jest-mock-extended'

type SutTypes = {
  sut: ValidationComposite
  validatorStub1: MockProxy<IValidation>
  validatorStub2: MockProxy<IValidation>
  validations: IValidation[]
}

const makeSut = (): SutTypes => {
  const validatorStub1 = mock<IValidation>()
  validatorStub1.validate.mockReturnValue(undefined)

  const validatorStub2 = mock<IValidation>()
  validatorStub2.validate.mockReturnValue(undefined)

  const validations = [validatorStub1, validatorStub2]

  const sut = new ValidationComposite(validations)
  return { sut, validatorStub1, validatorStub2, validations }
}

const nomeCampo = faker.random.word()

describe('Validation-Composite', () => {
  test('Não deve retornar nada se a validação for bem-sucedida.', () => {
    const { sut } = makeSut()
    const error = sut.validate({ [nomeCampo]: faker.random.word() })
    expect(error).toBeFalsy()
  })

  test('Deve retornar o primeiro Error se mais de uma validação falhar.', () => {
    const { sut, validatorStub1, validatorStub2 } = makeSut()
    validatorStub1.validate.mockReturnValueOnce(new Error('error_1'))
    validatorStub2.validate.mockReturnValueOnce(new Error('error_2'))
    const error = sut.validate({ [nomeCampo]: faker.random.word() })
    expect(error).toEqual(new Error('error_1'))
  })

  test('Deve retornar um Error se alguma validação falhar.', () => {
    const { sut, validatorStub2 } = makeSut()
    validatorStub2.validate.mockReturnValueOnce(new Error('error_2'))
    const error = sut.validate({ [nomeCampo]: faker.random.word() })
    expect(error).toEqual(new Error('error_2'))
  })
})
