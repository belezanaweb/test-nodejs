module.exports = class ExpressRouterAdapter {
  static adapt (router) {
    return async (request, response) => {
      const { query, body, params, headers, env } = request
      const httpResponse = await router.route({ query, body, params, headers, env })
      return response.type('json').status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}
