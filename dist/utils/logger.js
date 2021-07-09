"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    static info(message, args) {
        console.info(message, args);
    }
    static error(message, args) {
        console.error(message, args);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map