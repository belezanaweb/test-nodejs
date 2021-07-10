"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreConditionError = void 0;
class PreConditionError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.status = 412;
    }
}
exports.PreConditionError = PreConditionError;
//# sourceMappingURL=pre-condition-failed.js.map