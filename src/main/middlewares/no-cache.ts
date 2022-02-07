/*
https://github.com/helmetjs/nocache
Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate
Pragma: no-cache
Expires: 0
Surrogate-Control: no-store
*/

import { NextFunction, Request, Response } from 'express'

export const noCache = (req: Request, res: Response, next: NextFunction): void => {
  res.set('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.set('pragma', 'no-cache')
  res.set('expires', '0')
  res.set('surrogate-control', 'no-store')
  next()
}
