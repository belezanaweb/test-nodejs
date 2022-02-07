import { BussinessError } from '@/domain/bussiness-errors/bussiness-error'
import { ServerError } from '@/presentation/errors/'
import { badRequest, serverError500 } from '@/presentation/http/http-status'

export default function ErrorHandler (): any {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value
    descriptor.value = async function (...args: any[]) {
      try {
        return await fn.apply(this, args)
      } catch (error: any) {
        if (error instanceof BussinessError) {
          return badRequest(error)
        }
        const error500 = makeServerError(error)
        return serverError500(error500)
      }
    }
  }
}

function makeServerError (error: any): ServerError {
  const sqlErr: string = (error.query) ? error.query : undefined
  const sqlParams = error.parameters ? JSON.stringify(error.parameters) : undefined
  const dbError = (sqlErr ?? sqlParams) ? `Query: ${sqlErr ?? ''} \n\n Parameters: ${sqlParams ?? ''}` : undefined
  return new ServerError(error.stack, dbError)
}
