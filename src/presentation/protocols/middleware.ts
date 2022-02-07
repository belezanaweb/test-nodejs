import { IHttpRequest, IHttpResponse } from '@/presentation/protocols/index'

export interface IMiddleware {
  handle: (httpRequest: IHttpRequest) => Promise<IHttpResponse>
}
