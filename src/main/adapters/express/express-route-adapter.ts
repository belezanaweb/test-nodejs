import { Request, Response } from 'express'

import { IController, IHttpRequest } from '../../../presentation/protocols'

export const adaptRoute = (controller: IController) => {
  return async (req: Request, res: Response): Promise<void> => {
    const httpRequest: IHttpRequest = {
      params: req.params,
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
