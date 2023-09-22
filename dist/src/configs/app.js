"use strict";
/* eslint-disable linebreak-style */
/* eslint no-process-env: "off" */
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_TOKEN_SECRET = exports.IS_TEST = exports.IS_LOCAL = exports.IS_PRODUCTION = exports.NODE_KEEP_ALIVE_TIMEMOUT_MS = exports.PORT = exports.SERVICE_NAME = exports.DB_URL = exports.APP_MODE = exports.APP_ENV = exports.NODE_ENV = void 0;
// NOTE: All env vars from process.env are imported as STRINGS. It is important to keep this in mind and cast your env vars as needed.
_a = process.env, exports.NODE_ENV = _a.NODE_ENV, exports.APP_ENV = _a.APP_ENV, exports.APP_MODE = _a.APP_MODE, exports.DB_URL = _a.DB_URL;
exports.SERVICE_NAME = process.env.SERVICE_NAME || 'mvp';
exports.PORT = process.env.PORT || '9000';
exports.NODE_KEEP_ALIVE_TIMEMOUT_MS = Number(process.env.NODE_KEEP_ALIVE_TIMEMOUT_MS) || 65000;
exports.IS_PRODUCTION = exports.NODE_ENV === 'production';
exports.IS_LOCAL = exports.NODE_ENV === 'local';
exports.IS_TEST = exports.NODE_ENV === 'test';
exports.JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;
//# sourceMappingURL=app.js.map