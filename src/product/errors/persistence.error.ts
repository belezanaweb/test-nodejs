export class PersistenceError extends Error {
  constructor(public message) {
    super(message);
  }
}

export class NotFoundEntityPersistenceError extends Error {
  constructor(public message) {
    super(message);
  }
}
