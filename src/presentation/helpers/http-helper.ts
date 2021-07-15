import { ServerError } from '../errors'
import { IHttpResponse } from '../protocols/http'

type errorBody = {
  error_type: string
  error_message: string
}

const getErrorBody = (error: Error): errorBody => ({
  error_type: error.name,
  error_message: error.message
})

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
  body: getErrorBody(error)
})

export const unauthorized = (error: Error): IHttpResponse => ({
  statusCode: 401,
  body: getErrorBody(error)
})

export const forbidden = (error: Error): IHttpResponse => ({
  statusCode: 403,
  body: getErrorBody(error)
})

export const notFound = (error: Error): IHttpResponse => ({
  statusCode: 404,
  body: getErrorBody(error)
})

export const ok = (data: any): IHttpResponse => ({
  statusCode: 200,
  body: data
})

export const noContent = (): IHttpResponse => ({
  statusCode: 204
})

export const serverError = (reason: string): IHttpResponse => ({
  statusCode: 500,
  body: new ServerError(reason)
})
