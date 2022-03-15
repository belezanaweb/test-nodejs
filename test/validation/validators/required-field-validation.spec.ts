import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { random } from 'faker/locale/pt_BR'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation(nomeCampo)
}

const nomeCampo = random.word()

describe('RequiredField-Validation', () => {
  test('Deve retornar um MissingParamError se a validação falhar.', () => {
    const sut = makeSut()
    const error = sut.validate({ invalidField: random.word() })
    expect(error).toEqual(new MissingParamError(nomeCampo))
  })

  test('Não deve retornar nada se a validação for bem-sucedida.', () => {
    const sut = makeSut()
    const error = sut.validate({ [nomeCampo]: random.word() })
    expect(error).toBeFalsy()
  })
})
