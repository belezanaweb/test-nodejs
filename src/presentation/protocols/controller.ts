import { IHttpRequest, IHttpResponse } from './http'

export interface IController {
  handle(request: IHttpRequest): Promise<IHttpResponse>
}
