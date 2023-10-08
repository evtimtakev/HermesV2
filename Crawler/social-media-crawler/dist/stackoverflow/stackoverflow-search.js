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
exports.StackoverflowSearch = void 0;
const get_1 = require("../common/decorators/http/get");
const dotenv = __importStar(require("dotenv"));
const moment_1 = __importDefault(require("moment"));
dotenv.config();
const STACKOVERFLOW_SEARCH_URL = `${process.env.STACKOVERFLOW_URL}/2.3/search/advanced`;
class StackoverflowSearch {
    static searchPosts(term, fromDate) {
        return {
            url: STACKOVERFLOW_SEARCH_URL,
            params: {
                site: "stackoverflow.com",
                q: term,
                pagesize: 100,
                order: "desc",
                sort: "relevance",
                fromdate: fromDate
            }
        };
    }
    static toReportModel(stackOverflowPosts) {
        return stackOverflowPosts.map((item) => ({
            description: `Tags: ${item.tags.join(", ")}`,
            title: item.title,
            url: item.link,
            created: moment_1.default.unix(item.creation_date).format("MM/DD/YYYY")
        }));
    }
}
__decorate([
    (0, get_1.GET)()
], StackoverflowSearch, "searchPosts", null);
exports.StackoverflowSearch = StackoverflowSearch;
//# sourceMappingURL=stackoverflow-search.js.map