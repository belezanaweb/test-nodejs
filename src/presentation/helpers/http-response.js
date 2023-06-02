module.exports = class HttpResponse {
  static ok (body) {
    return {
      statusCode: 200,
      body
    }
  }

  static created (body) {
    return {
      statusCode: 201,
      body
    }
  }

  static noContent () {
    return {
      statusCode: 204
    }
  }

  static badRequest (error) {
    return {
      statusCode: 400,
      body: {
        error: error?.message || 'Bad request'
      }
    }
  }

  static notFound (error) {
    return {
      statusCode: 404,
      body: {
        error: error?.message
      }
    }
  }

  static unauthorizedError (error) {
    return {
      statusCode: 401,
      body: {
        error: error?.message || 'Unauthorized'
      }
    }
  }

  static serverError (error) {
    return {
      statusCode: error?.statusCode || 500,
      body: {
        error: error?.message
      }
    }
  }
}
