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
exports.classify = exports.getSocialMediaData = void 0;
const axios_1 = __importDefault(require("axios"));
const index_js_1 = __importDefault(require("../../social-media-crawler/index.js"));
const { crawlSocialMedia } = index_js_1.default;
const PREDICT_API_URL = "http://127.0.0.1:5000/predict";
const getSocialMediaData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield crawlSocialMedia();
        const decoratedData = {
            socials: []
        };
        res.send(JSON.stringify(data));
    }
    catch (e) {
        res.status(500).send(e);
    }
});
exports.getSocialMediaData = getSocialMediaData;
const classify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { prm, filter, content } = req.body;
        const response = yield axios_1.default.post(PREDICT_API_URL, {
            "prm": prm,
            "filter": filter,
            "content": content
        });
        res.send(JSON.stringify(response.data));
    }
    catch (e) {
        res.status(500).send(JSON.stringify(e));
    }
});
exports.classify = classify;
//# sourceMappingURL=routes.js.map