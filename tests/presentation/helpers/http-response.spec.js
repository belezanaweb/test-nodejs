const { HttpResponse } = require('../../../src/presentation/helpers')

describe('Unit HttpResponse', () => {
  test('ok', () => {
    const response = HttpResponse.ok({ id: 'OK' })
    expect(response).toStrictEqual({ statusCode: 200, body: { id: 'OK' } })
  })
  test('created', () => {
    const response = HttpResponse.created({ id: 'CREATED' })
    expect(response).toStrictEqual({ statusCode: 201, body: { id: 'CREATED' } })
  })
  test('notFound', () => {
    const response = HttpResponse.notFound({ message: 'NOT_FOUND' })
    expect(response).toStrictEqual({ statusCode: 404, body: { error: 'NOT_FOUND' } })
  })
  test('badRequest', () => {
    const response = HttpResponse.badRequest({ message: 'BAD_REQUEST' })
    expect(response).toStrictEqual({ statusCode: 400, body: { error: 'BAD_REQUEST' } })
  })

  test('badRequest', () => {
    const response = HttpResponse.badRequest({ })
    expect(response).toStrictEqual({ statusCode: 400, body: { error: 'Bad request' } })
  })

  test('unauthorizedError', () => {
    const response = HttpResponse.unauthorizedError({ message: 'UNAUTHORIZED' })
    expect(response).toStrictEqual({ statusCode: 401, body: { error: 'UNAUTHORIZED' } })
  })

  test('unauthorizedError without message', () => {
    const response = HttpResponse.unauthorizedError({ })
    expect(response).toStrictEqual({ statusCode: 401, body: { error: 'Unauthorized' } })
  })
  test('serverError', () => {
    const response = HttpResponse.serverError({ message: 'SERVER_ERROR' })
    expect(response).toStrictEqual({ statusCode: 500, body: { error: 'SERVER_ERROR' } })
  })
  test('serverError with statusCode', () => {
    const response = HttpResponse.serverError({ statusCode: 999, message: 'SERVER_ERROR' })
    expect(response).toStrictEqual({ statusCode: 999, body: { error: 'SERVER_ERROR' } })
  })
})
