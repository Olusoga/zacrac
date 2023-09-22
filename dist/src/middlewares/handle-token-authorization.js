"use strict";
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
exports.handleTokenAuthorization = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("src/libs/errors");
const app_1 = require("src/configs/app");
const handleTokenAuthorization = (allowedRole) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.headers['authorization'].replace('Bearer ', '');
            const decoded = yield jsonwebtoken_1.default.verify(token, app_1.JWT_TOKEN_SECRET);
            if (!decoded) {
                res.status(401).json({
                    error_code: errors_1.ErrorCodes.UNAUTHORIZED_REQUEST,
                    message: 'Could not authorize request'
                });
            }
            if (allowedRole && decoded.role !== allowedRole) {
                res.status(401).json({
                    error_code: errors_1.ErrorCodes.UNAUTHORIZED_REQUEST,
                    message: 'Could not authorize request'
                });
            }
            res.locals.user = decoded;
            return next();
        }
        catch (e) {
            res.status(401).json({
                error_code: errors_1.ErrorCodes.UNAUTHORIZED_REQUEST,
                message: 'Could not authorize request'
            });
        }
    });
};
exports.handleTokenAuthorization = handleTokenAuthorization;
//# sourceMappingURL=handle-token-authorization.js.map