export class NotFoundError extends Error {
  constructor() {
    super()
    this.name = 'NotFoundError'
  }
}
