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
exports.crawlSocialMedia = void 0;
const subredit_search_1 = require("./redit/subredit-search");
const dotenv = __importStar(require("dotenv"));
const date_time_1 = require("./common/utils/date-time");
const stackoverflow_search_1 = require("./stackoverflow/stackoverflow-search");
const moment_1 = __importDefault(require("moment"));
const print_repoty_1 = require("./common/utils/print-repoty");
const twiter_search_1 = require("./twiter/twiter-search");
dotenv.config();
const crawlInRedit = (searchTerms, filterAmount, filterUnit) => __awaiter(void 0, void 0, void 0, function* () {
    const reditTerms = searchTerms;
    let reditResult = [];
    for (let i = 0; i <= reditTerms.length - 1; i++) {
        const { data } = (yield subredit_search_1.SubreditSearch.searchInSubredit(reditTerms[i])) || {};
        if (data && data.children) {
            const children = data.children.filter((entry) => {
                const { data } = entry;
                const startDate = (0, date_time_1.substractPeriod)(Number(filterAmount) || 1, filterUnit || "W");
                if ((0, date_time_1.isBetweenNowAndStartDate)(moment_1.default.unix(data.created_utc), startDate)) {
                    return entry;
                }
            });
            reditResult = [...reditResult, ...children];
        }
    }
    const mappedReditPosts = subredit_search_1.SubreditSearch.toReportModel(reditResult);
    return mappedReditPosts && mappedReditPosts.length > 0 ? mappedReditPosts : [print_repoty_1.NO_DATA];
});
const crawlInStackoverflow = (searchTermsInput, filterAmount, filterUnit) => __awaiter(void 0, void 0, void 0, function* () {
    const fromDate = (0, date_time_1.substractPeriod)(Number(filterAmount || 1), filterUnit || "W");
    let result = [];
    const searchTerms = searchTermsInput;
    for (let i = 0; i <= searchTerms.length - 1; i++) {
        const { items } = yield stackoverflow_search_1.StackoverflowSearch.searchPosts(searchTerms[i], fromDate.unix());
        result = [...result, ...items];
    }
    const mappedStackoverflowPosts = stackoverflow_search_1.StackoverflowSearch.toReportModel(result);
    return mappedStackoverflowPosts && mappedStackoverflowPosts.length > 0 ? mappedStackoverflowPosts : [print_repoty_1.NO_DATA];
});
const crawlInTwitter = (hashtagsInput, searchTermsInput) => __awaiter(void 0, void 0, void 0, function* () {
    const hashtags = hashtagsInput;
    const searchTerms = searchTermsInput;
    let result = [];
    if (searchTerms) {
        for (let i = 0; i <= searchTerms.length - 1; i++) {
            const searchText = searchTerms[i];
            let response = yield twiter_search_1.TwitterSearch.searchPosts({ searchText });
            if (response === null || response === void 0 ? void 0 : response.data) {
                result = [...result, ...response.data];
            }
        }
    }
    else {
        let response = yield twiter_search_1.TwitterSearch.searchPosts({ hashtags });
        result = [...result, response.data];
    }
    const mappedTwitterPosts = twiter_search_1.TwitterSearch.toReportModel(result);
    return mappedTwitterPosts && mappedTwitterPosts.length > 0 ? mappedTwitterPosts : [print_repoty_1.NO_DATA];
});
const crawlSocialMedia = (socialMediaSearch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = {
            socials: []
        };
        for (let i = 0; i <= socialMediaSearch.length - 1; i++) {
            const socialMedia = socialMediaSearch[i];
            if (socialMedia.id === "redit") {
                const { searchTerms, filterUnit, filterAmount } = socialMedia;
                const reditResult = yield crawlInRedit(searchTerms, filterAmount, filterUnit);
                response.socials.push({ id: "redit", data: reditResult });
            }
            if (socialMedia.id === "stackoverflow") {
                const { searchTerms, filterUnit, filterAmount } = socialMedia;
                const stackoverflowResult = yield crawlInStackoverflow(searchTerms, filterAmount, filterUnit);
                response.socials.push({ id: "stackoverflow", data: stackoverflowResult });
            }
            if (socialMedia.id === "twitter") {
                const { searchTerms, hashtagsInput } = socialMedia;
                const twitterResult = yield crawlInTwitter(hashtagsInput, searchTerms);
                response.socials.push({ id: "twitter", data: twitterResult });
            }
        }
        return response;
    }
    catch (e) {
        console.log("=======Hermes failed to run ===========");
        console.log(`======= Here is the stack trace: ${e} ===========`);
    }
});
exports.crawlSocialMedia = crawlSocialMedia;
//# sourceMappingURL=crawl-social-media.js.map