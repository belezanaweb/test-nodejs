import CustomError from "./base/CustomError"

export class NotFoundInDatabaseError extends CustomError {
  constructor(message) {
    super(message)
    this.name = 'NOT_FOUND_IN_DATABASE_ERROR'
  }
}

export class AlreadyExistingInDatabaseError extends CustomError {
  constructor(message) {
    super(message)
    this.name = 'ALREADY_EXISTING_IN_DATABASE_ERROR'
  }
}

export class DbNotDefinedInRepositoryError extends CustomError {
  constructor(message) {
    super(message)
    this.name = 'DB_NOT_DEFINED_IN_REPOSITORY_ERROR'
  }
}