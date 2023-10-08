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
exports.GET = void 0;
const axios_1 = __importDefault(require("axios"));
const GET = (bearerToken, headers) => (target, propertyKey, descriptor) => {
    const originalFunction = descriptor.value;
    descriptor.value = function (...args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url, params } = originalFunction.apply(target, args);
            try {
                const config = {
                    params: params,
                };
                if (headers) {
                    config["headers"] = headers;
                }
                if (bearerToken) {
                    config["headers"] = { Authorization: `Bearer ${bearerToken}` };
                }
                const { data } = yield axios_1.default.get(url, config);
                return data;
            }
            catch (e) {
                console.log(e);
                return undefined;
            }
        });
    };
    return descriptor;
};
exports.GET = GET;
//# sourceMappingURL=get.js.map