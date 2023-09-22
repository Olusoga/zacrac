"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
const winston = require('winston');
const app_1 = require("src/configs/app");
const createLogger = (level) => {
    const transports = [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ];
    const logger = winston.createLogger({
        level,
        format: winston.format.json(),
        transports,
        exitOnError: false
    });
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
    logger.stream = {
        write(message) {
            // use the 'info' log level so the output will be picked up by both transports (file and console)
            logger.info(`${new Date()} - ${message}`);
        }
    };
    return logger;
};
exports.logger = createLogger(app_1.IS_TEST ? 'silent' : 'info');
//# sourceMappingURL=index.js.map