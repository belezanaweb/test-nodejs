import { Schema } from 'joi'

export interface IValidator {
  params?: Schema
  query?: Schema
  body?: Schema
}
