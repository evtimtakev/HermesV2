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
var socialNetworks;
(function (socialNetworks) {
    socialNetworks["redit"] = "Reddit";
    socialNetworks["twitter"] = "Twitter";
    socialNetworks["stackOverflow"] = "Stack Overflow";
})(socialNetworks || (socialNetworks = {}));
const crawlInRedit = () => __awaiter(void 0, void 0, void 0, function* () {
    const reditTerms = process.env.REDIT_SUBREDIT_SEARCH_TERMS.split(",");
    let reditResult = [];
    for (let i = 0; i <= reditTerms.length - 1; i++) {
        const { data } = (yield subredit_search_1.SubreditSearch.searchInSubredit(reditTerms[i])) || {};
        if (data && data.children) {
            const children = data.children.filter((entry) => {
                const { data } = entry;
                const startDate = (0, date_time_1.substractPeriod)(Number(process.env.REDIT_TIME_SPAN_FILTER_AMOUNT) || 1, process.env.REDIT_TIME_SPAN_FILTER_UNIT || "W");
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
const crawlInStackoverflow = () => __awaiter(void 0, void 0, void 0, function* () {
    const fromDate = (0, date_time_1.substractPeriod)(Number(process.env.STACKOVERFLOW_TIME_SPAN_FILTER_AMOUNT) || 1, process.env.STACKOVERFLOW_TIME_SPAN_FILTER_UNIT || "W");
    let result = [];
    const searchTerms = process.env.STACKOVERFLOW_SEARCH_TERMS.split(",");
    for (let i = 0; i <= searchTerms.length - 1; i++) {
        const { items } = yield stackoverflow_search_1.StackoverflowSearch.searchPosts(searchTerms[i], fromDate.unix());
        result = [...result, ...items];
    }
    const mappedStackoverflowPosts = stackoverflow_search_1.StackoverflowSearch.toReportModel(result);
    return mappedStackoverflowPosts && mappedStackoverflowPosts.length > 0 ? mappedStackoverflowPosts : [print_repoty_1.NO_DATA];
});
const crawlInTwitter = () => __awaiter(void 0, void 0, void 0, function* () {
    const hashtags = process.env.TWITTER_SEARCH_BY_HASHTAGS.split(",");
    const searchTerms = process.env.TWITTER_SEARCH_BY_TERMS.split(",");
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
const crawlSocialMedia = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const printReportData = {
            socials: []
        };
        if (JSON.parse(process.env.ENABLE_REDIT)) {
            const reditResult = yield crawlInRedit();
            printReportData.socials.push({ id: socialNetworks.redit, data: reditResult });
        }
        if (JSON.parse(process.env.ENABLE_STACKOVERFLOW)) {
            const stackoverflowResult = yield crawlInStackoverflow();
            printReportData.socials.push({ id: socialNetworks.stackOverflow, data: stackoverflowResult });
        }
        if (JSON.parse(process.env.ENABLE_TWITTER)) {
            const twitterResult = yield crawlInTwitter();
            printReportData.socials.push({ id: socialNetworks.twitter, data: twitterResult });
        }
        return printReportData;
    }
    catch (e) {
        console.log("=======Hermes failed to run ===========");
        console.log(`======= Here is the stack trace: ${e} ===========`);
    }
});
exports.crawlSocialMedia = crawlSocialMedia;
//# sourceMappingURL=crawl-social-media.js.map