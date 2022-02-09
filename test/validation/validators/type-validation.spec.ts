import { InvalidParamError } from '@/presentation/errors'
import { TypeValidation } from '@/validation/validators/type-validation'
import { datatype, random } from 'faker/locale/pt_BR'

const makeSut = (fieldType: 'string' | 'number' | 'object', isArray?: boolean): TypeValidation => {
  return new TypeValidation(fieldName, fieldType, isArray)
}

const fieldName = random.word()

describe('CompareFields-Validation', () => {
  describe('string | notArray', () => {
    test('Não deve retornar um InvalidParamError, string == string', () => {
      const sut = makeSut('string')
      const error = sut.validate({
        [fieldName]: random.word()
      })
      expect(error).toBeFalsy()
    })

    test('Deve retornar um InvalidParamError, number != string', () => {
      const sut = makeSut('string')
      const error = sut.validate({
        [fieldName]: datatype.number()
      })
      expect(error).toEqual(new InvalidParamError(fieldName))
    })
  })

  describe('string | array', () => {
    test('Não deve retornar um InvalidParamError, string[] == string[]', () => {
      const sut = makeSut('string', true)
      const error = sut.validate({
        [fieldName]: [
          random.word(),
          random.word(),
          random.word()
        ]
      })
      expect(error).toBeFalsy()
    })

    test('Deve retornar um InvalidParamError, any[] != string[]', () => {
      const sut = makeSut('string', true)
      const error = sut.validate({
        [fieldName]: [
          random.word(),
          datatype.number(),
          random.word()
        ]
      })
      expect(error).toEqual(new InvalidParamError(fieldName))
    })

    test('Deve retornar um InvalidParamError, number != string[]', () => {
      const sut = makeSut('string', true)
      const error = sut.validate({
        [fieldName]: datatype.number()
      })
      expect(error).toEqual(new InvalidParamError(fieldName))
    })
  })

  describe('number | notArray', () => {
    test('Deve retornar um InvalidParamError se a validação falhar.', () => {
      const sut = makeSut('number')
      const error = sut.validate({
        [fieldName]: datatype.number()
      })
      expect(error).toBeFalsy()
    })

    test('Não deve retornar nada se a validação for bem-sucedida.', () => {
      const sut = makeSut('number')
      const error = sut.validate({
        [fieldName]: random.word()
      })
      expect(error).toEqual(new InvalidParamError(fieldName))
    })
  })

  describe('object | notArray', () => {
    test('Deve retornar um InvalidParamError se a validação falhar.', () => {
      const sut = makeSut('object')
      const error = sut.validate({
        [fieldName]: { a: datatype.number() }
      })
      expect(error).toBeFalsy()
    })

    test('Não deve retornar nada se a validação for bem-sucedida.', () => {
      const sut = makeSut('object')
      const error = sut.validate({
        [fieldName]: random.word()
      })
      expect(error).toEqual(new InvalidParamError(fieldName))
    })
  })
})
