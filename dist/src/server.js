"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable valid-jsdoc */
require("source-map-support/register");
require("./module-alias");
const dotenv = __importStar(require("dotenv")); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
// This needs to be imported before everything else.
const logger_1 = require("src/libs/logger");
const app_1 = require("src/app");
const http_graceful_shutdown_1 = __importDefault(require("http-graceful-shutdown"));
/**
 * Helper function to log an exit code before exiting the process.
 */
const logAndExitProcess = (exitCode) => {
    logger_1.logger.info({
        exit_code_number: exitCode
    }, 'Exiting process');
    // eslint-disable-next-line no-process-exit
    process.exit(exitCode);
};
/**
 * Sets up event listeners on unexpected errors and warnings. These should theoretically
 * never happen. If they do, we assume that the app is in a bad state. For errors, we
 * exit the process with code 1.
 */
const setupProcessEventListeners = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    process.on('unhandledRejection', (reason) => {
        logger_1.logger.warn({ reason_object: reason }, 'encountered unhandled rejection');
        logAndExitProcess(1);
    });
    process.on('uncaughtException', (err) => {
        logger_1.logger.error(err, 'encountered uncaught exception');
        logAndExitProcess(1);
    });
    process.on('warning', (warning) => {
        logger_1.logger.warn({
            warning_object: warning
        }, 'encountered warning');
    });
};
/**
 * Start an Express server and installs signal handlers on the
 * process for graceful shutdown.
 */
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const app = yield (0, app_1.createApp)();
        const server = app.listen(app.get('port'), () => {
            console.log({
                port_number: app.get('port'),
                env_string: app.get('env')
            });
            logger_1.logger.info({
                port_number: app.get('port'),
                env_string: app.get('env')
            }, 'Started express server');
        });
        (0, http_graceful_shutdown_1.default)(server);
        setupProcessEventListeners();
    }
    catch (err) {
        logger_1.logger.error(err, 'error caught in server.ts');
    }
}))();
//# sourceMappingURL=server.js.map