"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandardError = void 0;
class StandardError extends Error {
    constructor(errorCode, message, body, lastError, context) {
        super(message);
        // So you can do typeof CustomError
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = this.constructor.name;
        this.error_code = errorCode;
        this.lastError = lastError;
        this.context = context;
        this.body = body;
    }
}
exports.StandardError = StandardError;
//# sourceMappingURL=standard-error.js.map