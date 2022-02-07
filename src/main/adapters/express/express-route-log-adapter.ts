/*
import { IHttpResponse } from '@/presentation/protocols'
import { randomUUID } from 'crypto'
import { Request, Response } from 'express'

export const adaptRouteLogInsert = async (req: Request, res: Response, httpResponse: IHttpResponse, dataInicioReq: Date): Promise<void> => {
  const dif = dataInicioReq.getTime() - new Date().getTime()
  const secondsFromT1toT2 = dif / 1000
  const secondsBetweenDates = Math.abs(secondsFromT1toT2)

  const logApiModel: ILogApiModel = {
    metodo: req.method,
    protocolo: req.protocol,
    hostname: req.hostname,
    baseUrl: req.baseUrl,
    rota: req.path,
    queryParams: req.url.split('?')[1],
    body: JSON.stringify(req.body),
    response: (httpResponse.body?.error instanceof Error) ? JSON.stringify(httpResponse.body.error.message) : JSON.stringify(httpResponse.body),
    codigoStatus: res.statusCode,
    mensagemStatus: `${res.statusCode} ${res.statusMessage}`,
    sucesso: !(httpResponse.body?.error instanceof Error),
    errorStack: (httpResponse.body?.error instanceof Error) ? JSON.stringify(httpResponse.body.error.stack) : undefined,
    databaseError: (httpResponse.body?.error instanceof Error) ? httpResponse.body.error.dbError : undefined,
    UUID: randomUUID(),
    formDataFiles: JSON.stringify(req.files),
    headers: JSON.stringify(req.headers),
    userAuth: JSON.stringify(req.userAuth),
    tempoRequest: secondsBetweenDates
  }
  await logApiRepository.insert(logApiModel)
}
*/
