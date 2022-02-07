import { IHttpRequest, IHttpResponse } from '@/presentation/protocols'

export interface IController {
  handle: (httpRequest: IHttpRequest) => Promise<IHttpResponse>
}
