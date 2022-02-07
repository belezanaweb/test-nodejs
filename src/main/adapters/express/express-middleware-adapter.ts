import { IHttpRequest, IMiddleware } from '@/presentation/protocols'
import { NextFunction, Request, Response } from 'express'

export const adaptMiddleware = (middleware: IMiddleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: IHttpRequest = { headers: req.headers }
    const { statusCode, body } = await middleware.handle(httpRequest)
    if (statusCode === 200) {
      Object.assign(req, body)
      next()
    } else {
      res.status(statusCode).send({ error: body.error.message })
    }
  }
}
