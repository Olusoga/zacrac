"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("src/libs/logger");
const errors_1 = require("src/libs/errors");
const errorHandler = () => 
// This is an express error handler, need to the 4 variable signature
// eslint-disable-next-line
(err, req, res, next) => {
    const statusCode = Number(errors_1.ErrorCodeMap[err.error_code]);
    if (!Number.isNaN(statusCode)) {
        const logContext = {
            error_code: err.error_code,
            status_code: statusCode,
            context: err.context
        };
        // _.defaults(logContext, req.safeLoggingRequestData); // to be determined what is this for
        logger_1.logger.info(logContext, 'API error');
        return res.status(statusCode).send({
            error_code: err.error_code,
            message: err.message
        });
    }
    return res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=handle-error-code.js.map