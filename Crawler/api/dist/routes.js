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
exports.getSocialMediaData = void 0;
const index_js_1 = __importDefault(require("../../social-media-crawler/index.js"));
const { crawlSocialMedia } = index_js_1.default;
const PREDICT_API_URL = "http://127.0.0.1:5000/predict";
const SOCIAL_MEDIA_FILTERS = {
    redit: {
        searchTerms: [],
        filterAmount: 1,
        filterUnit: "w"
    },
    stackoverflow: {
        searchTerms: [],
        filterAmount: 1,
        filterUnit: "w"
    },
    twitter: {
        searchTerms: [],
    }
};
const getSocialMediaData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const socialNetworks = req.body;
        const data = yield crawlSocialMedia(socialNetworks);
        res.send(JSON.stringify(data));
    }
    catch (e) {
        res.status(500).send(e);
    }
});
exports.getSocialMediaData = getSocialMediaData;
//# sourceMappingURL=routes.js.map