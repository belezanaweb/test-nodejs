export default class CustomError extends Error {
  constructor(message) {
    super(message)
    this.name = 'CUSTOM_ERROR'
    this.message = message
  }
}