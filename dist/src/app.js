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
exports.createApp = void 0;
/* eslint-disable linebreak-style */
/* eslint-disable valid-jsdoc */
const express_1 = __importDefault(require("express"));
const express_http_context_1 = __importDefault(require("express-http-context"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const OpenApiValidator = __importStar(require("express-openapi-validator"));
const app_1 = require("src/configs/app");
const handle_error_code_1 = require("src/middlewares/handle-error-code");
const init_1 = require("src/init");
/**
 * Setup the application routes with controllers
 * @param app
 */
function setupRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        const { healthcheckController } = yield (0, init_1.init)();
        app.use('/healthcheck', healthcheckController.getRouter());
    });
}
/**
 * Main function to setup Express application here
 */
function createApp() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.set('port', app_1.PORT);
        app.use((0, helmet_1.default)());
        app.use((0, compression_1.default)());
        app.use(body_parser_1.default.json({ limit: '5mb', type: 'application/json' }));
        app.use(body_parser_1.default.urlencoded({ extended: true }));
        app.use((0, cors_1.default)());
        // This should be last, right before routes are installed
        // so we can have access to context of all previously installed
        // middlewares inside our routes to be logged
        app.use(express_http_context_1.default.middleware);
        app.use(OpenApiValidator.middleware({
            apiSpec: './docs/openapi.yaml',
        }));
        yield setupRoutes(app);
        // In order for errors from async controller methods to be thrown here,
        // you need to catch the errors in the controller and use `next(err)`.
        // See https://expressjs.com/en/guide/error-handling.html
        app.use((0, handle_error_code_1.errorHandler)());
        return app;
    });
}
exports.createApp = createApp;
//# sourceMappingURL=app.js.map