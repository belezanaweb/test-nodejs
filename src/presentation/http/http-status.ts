import { ServerError, UnauthorizedError } from '@/presentation/errors/'
import { IHttpResponse } from '@/presentation/protocols/http'

export const ok = (data: any): IHttpResponse => ({
  statusCode: 200,
  body: { data: data ?? {} }
})

export const created = (data: any): IHttpResponse => ({
  statusCode: 201,
  body: { data: data ?? {} }
})

export const noContent = (): IHttpResponse => ({
  statusCode: 204,
  body: undefined
})

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
  body: { error: error }
})

export const unauthorized = (error: Error = new UnauthorizedError()): IHttpResponse => ({
  statusCode: 401,
  body: { error: error }
})

export const serverError500 = (serverError: ServerError): IHttpResponse => ({
  statusCode: 500,
  body: { error: serverError }
})
