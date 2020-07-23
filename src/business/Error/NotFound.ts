import { BaseError } from "./baseError";

export class NotFound extends BaseError {
    constructor() {
        super(404, "Not found")
    }
}