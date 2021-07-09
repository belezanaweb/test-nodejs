"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
class ErrorHandler {
    static handle(err, req, res, next) {
        let errorMessage = err.message;
        if (err['response'] && err['response']['data']) {
            errorMessage = err['response']['data'];
        }
        let error = {
            errorMessage: errorMessage,
            path: req.url,
        };
        res.status(err['status'] ? err['status'] : 500);
        res.send(error);
        res.end();
    }
}
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=error-handler.js.map