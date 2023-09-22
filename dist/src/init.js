"use strict";
/* eslint-disable linebreak-style */
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
exports.init = void 0;
const healthcheck_1 = require("src/controllers/healthcheck");
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        // controllers
        const healthcheckController = new healthcheck_1.HealthcheckController();
        return {
            healthcheckController
        };
    });
}
exports.init = init;
//# sourceMappingURL=init.js.map