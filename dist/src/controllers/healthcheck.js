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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthcheckController = void 0;
/* eslint-disable linebreak-style */
/* eslint-disable valid-jsdoc */
const express_1 = require("express");
class HealthcheckController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.get('/liveness', HealthcheckController.getHealthcheckLiveness);
        this.router.get('/readiness', HealthcheckController.getHealthcheckReadiness);
    }
    getRouter() {
        return this.router;
    }
    /**
       * GET /healthcheck/liveness
       * Check whether app is up
       */
    static getHealthcheckLiveness(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(200).json({ status: 'OK' });
        });
    }
    /**
       * GET /healthcheck/readiness
       * Check whether app is ready to receive traffic
       */
    static getHealthcheckReadiness(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(200).json({ status: 'OK' });
        });
    }
}
exports.HealthcheckController = HealthcheckController;
//# sourceMappingURL=healthcheck.js.map