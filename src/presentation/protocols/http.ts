export interface IHttpRequest {
  headers?: any
  pathParams?: any
  queryParams?: any
  body?: any
  userAuth?: any
  formDataFiles?: any
}

export interface IHttpResponse {
  statusCode: number
  body?: any
}
