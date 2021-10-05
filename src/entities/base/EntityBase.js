import { cloneObject } from "./helper"

export default class EntityBase {
  toJson () {
    return cloneObject(this)
  }

}