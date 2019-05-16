/**
 * @swagger
 * definitions:
 *   Error:
 *     properties:
 *       message:
 *         type: string
 *       code:
 *         type: string
 *       errors:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             code:
 *               type: string
 */
class CustomError extends Error {
  constructor() {
    super()
    this.errors = []
  }

  addError(code, message, path) {
    this.code = this.code || code
    this.message = this.message || message
    this.errors.push({
      code, message: message || code, path
    })
  }
}

module.exports = CustomError
