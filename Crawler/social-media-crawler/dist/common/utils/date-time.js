"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.substractPeriod = exports.isBetweenNowAndStartDate = void 0;
const moment_1 = __importDefault(require("moment"));
const isBetweenNowAndStartDate = (dateToCheck, startDate) => {
    return (0, moment_1.default)(dateToCheck).isBetween(startDate, (0, moment_1.default)());
};
exports.isBetweenNowAndStartDate = isBetweenNowAndStartDate;
const substractPeriod = (amount, unit) => {
    return (0, moment_1.default)().subtract(amount, unit.toUpperCase()).startOf("day");
};
exports.substractPeriod = substractPeriod;
//# sourceMappingURL=date-time.js.map