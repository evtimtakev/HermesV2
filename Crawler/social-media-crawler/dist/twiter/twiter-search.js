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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitterSearch = void 0;
const get_1 = require("../common/decorators/http/get");
const dotenv = __importStar(require("dotenv"));
const querystring_1 = __importDefault(require("querystring"));
const moment_1 = __importDefault(require("moment"));
dotenv.config();
const TWITTER_SEARCH_URL = `${process.env.TWITTER_API_URL}/2/tweets/search/recent`;
class TwitterSearch {
    //#${process.env.TWITTER_PRIMARY_HASHTAG} (#${hashtags.join(" OR #")})
    //+ `%20(${process.env.TWITTER_SEARCH_BY_TERM})`
    static searchPosts({ hashtags, searchText }) {
        const query = searchText ?
            `${searchText} lang:${process.env.TWITTER_SEARCH_LANG} -is:retweet`
            : `#${hashtags.join(" OR #")} lang:${process.env.TWITTER_SEARCH_LANG} -is:retweet`;
        const params = querystring_1.default.stringify({
            "query": query,
            "tweet.fields": "entities,source,created_at",
            "max_results": 100
        });
        return {
            url: TWITTER_SEARCH_URL + `?${params}`,
        };
    }
    static toReportModel(twitterPosts) {
        return twitterPosts === null || twitterPosts === void 0 ? void 0 : twitterPosts.filter(posts => posts.text).map((item) => {
            var _a, _b;
            let mediaDesc = [];
            if ((_a = item.entities) === null || _a === void 0 ? void 0 : _a.urls) {
                mediaDesc = (_b = item.entities.urls) === null || _b === void 0 ? void 0 : _b.filter(url => url.title).map(url => {
                    return `SHARED RESOURCE IN TWEET:</br> Title: ${url.title}</br> Description: ${url.description} </br> Link: ${url.expanded_url}`;
                });
            }
            return {
                description: mediaDesc.join("</br></br>"),
                title: item === null || item === void 0 ? void 0 : item.text,
                url: `${process.env.TWITTER_URL}/allvirtual/status/${item.id}`,
                created: (0, moment_1.default)(item.created_at).format("MM/DD/YYYY")
            };
        });
    }
}
__decorate([
    (0, get_1.GET)(process.env.TWITTER_BEARER_TOKEN)
], TwitterSearch, "searchPosts", null);
exports.TwitterSearch = TwitterSearch;
//# sourceMappingURL=twiter-search.js.map