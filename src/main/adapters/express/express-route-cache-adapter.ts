/*
import { redisCacheAdapter } from '@/main/factories/adapters/redis-cache-adapter-factory'
import { IHttpResponse } from '@/presentation/protocols'
import { Request, Response } from 'express'
import { adaptRouteLogInsert } from './express-route-log-adapter'

export const adaptRouteCache = (adaptRoute: (req: Request, res: Response) => Promise<IHttpResponse>, expTimeSec?: number) => {
  return async (req: Request, res: Response) => {
    const dtIniReq = new Date()
    const redisResult = await redisCacheAdapter.getHttpRespCache(req.originalUrl)
    if (redisResult) {
      res.status(redisResult.statusCode).send({ isCache: true, ...redisResult.body })
      await adaptRouteLogInsert(req, res, redisResult, dtIniReq)
    } else {
      const httpResponse = await adaptRoute(req, res)
      await redisCacheAdapter.setHttpRespCache(req.originalUrl, httpResponse, expTimeSec)
    }
  }
}
*/
