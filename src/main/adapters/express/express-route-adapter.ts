import { IController } from '@/presentation/protocols'
import { IHttpRequest } from '@/presentation/protocols/'
import { Request, Response } from 'express'

export const adaptRoute = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      body: req.body,
      pathParams: req.params,
      queryParams: formatReqQueryParams(req.query),
      userAuth: req.userAuth,
      headers: req.headers
    }

    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.body?.error instanceof Error) {
      res.status(httpResponse.statusCode).send({ error: httpResponse.body.error.message })
    } else {
      res.status(httpResponse.statusCode).send(httpResponse.body)
    }

    return httpResponse
  }
}

function formatReqQueryParams (reqQuery: any): object {
  const keys = Object.keys(reqQuery)
  for (const key of keys) {
    reqQuery[key] = typeof reqQuery[key] === 'string' ? (reqQuery[key].indexOf(',') > -1 ? reqQuery[key].split(',') : reqQuery[key] === 'true' ? true : reqQuery[key] === 'false' ? false : reqQuery[key]) : reqQuery[key]
  }
  return reqQuery
}
