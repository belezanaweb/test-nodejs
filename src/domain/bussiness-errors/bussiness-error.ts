export abstract class BussinessError extends Error {
  constructor (msg: any) {
    super(msg)
    this.name = 'BussinessError'
  }
}
