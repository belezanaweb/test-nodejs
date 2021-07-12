"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel["INFO"] = "INFO";
    LogLevel["ERROR"] = "ERROR";
})(LogLevel || (LogLevel = {}));
class Logger {
    static info(message, args) {
        const log = {
            level: LogLevel.INFO,
            message,
            data: JSON.stringify(args)
        };
        console.log(log);
    }
    static error(message, args) {
        const log = {
            level: LogLevel.ERROR,
            message,
            data: JSON.stringify(args)
        };
        console.log(log);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map