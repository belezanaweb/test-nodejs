import IHttpRequest from './IHttpRequest';
import IHttpResponse from './IHttpResponse';

export default interface IController {
  handle(request: IHttpRequest): Promise<IHttpResponse>
}
