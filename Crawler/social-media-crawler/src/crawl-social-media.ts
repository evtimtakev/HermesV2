import {SubreditSearch} from "./redit/subredit-search";
import * as dotenv from "dotenv";
import {isBetweenNowAndStartDate, substractPeriod} from "./common/utils/date-time";
import {StackoverflowSearch} from "./stackoverflow/stackoverflow-search";
import moment from "moment";
import {NO_DATA} from "./common/utils/print-repoty";
import {TwitterSearch} from "./twiter/twiter-search";
dotenv.config()

enum socialNetworks {
    redit = "Reddit",
    twitter = "Twitter",
    stackOverflow = "Stack Overflow"
}

const crawlInRedit = async (): Promise<any> => {
    const reditTerms = process.env.REDIT_SUBREDIT_SEARCH_TERMS.split(",")
    let reditResult = []

    for (let i = 0; i <= reditTerms.length -1; i++) {
        const { data } = await SubreditSearch.searchInSubredit(reditTerms[i]) || {};

        if(data && data.children) {
            const children = data.children.filter((entry) => {
                const { data } = entry;
                const startDate = substractPeriod(Number(process.env.REDIT_TIME_SPAN_FILTER_AMOUNT) || 1,process.env.REDIT_TIME_SPAN_FILTER_UNIT || "W");
                if(isBetweenNowAndStartDate(moment.unix(data.created_utc), startDate)) {
                    return entry;
                }
            });

            reditResult = [...reditResult, ...children]
        }

    }

    const mappedReditPosts = SubreditSearch.toReportModel(reditResult);
    return mappedReditPosts && mappedReditPosts.length > 0 ? mappedReditPosts : [NO_DATA];
}

const crawlInStackoverflow = async (): Promise<any> => {
    const fromDate = substractPeriod(Number(process.env.STACKOVERFLOW_TIME_SPAN_FILTER_AMOUNT) || 1, process.env.STACKOVERFLOW_TIME_SPAN_FILTER_UNIT || "W");
    let result = [];
    const searchTerms = process.env.STACKOVERFLOW_SEARCH_TERMS.split(",");

    for (let i = 0; i<= searchTerms.length -1; i++) {
        const {items} = await StackoverflowSearch.searchPosts(searchTerms[i], fromDate.unix());
        result = [...result, ...items]
    }

    const mappedStackoverflowPosts = StackoverflowSearch.toReportModel(result)
    return mappedStackoverflowPosts && mappedStackoverflowPosts.length > 0 ? mappedStackoverflowPosts : [NO_DATA];
}


const crawlInTwitter = async (): Promise<any> => {
    const hashtags = process.env.TWITTER_SEARCH_BY_HASHTAGS.split(",");
    const searchTerms = process.env.TWITTER_SEARCH_BY_TERMS.split(",");
    let result = [];

    if(searchTerms) {
        for (let i = 0; i<= searchTerms.length -1; i++) {
            const searchText = searchTerms[i];
            let response = await TwitterSearch.searchPosts({searchText});

            if(response?.data) {
                result = [...result,...response.data ];
            }

        }
    } else {
        let response = await TwitterSearch.searchPosts({hashtags});
        result = [...result,response.data ];
    }

    const mappedTwitterPosts = TwitterSearch.toReportModel(result);
    return mappedTwitterPosts && mappedTwitterPosts.length > 0 ? mappedTwitterPosts : [NO_DATA];
}

export const crawlSocialMedia = async (): Promise<any> => {

    try {
        const printReportData = {
            socials: []
        };

        if(JSON.parse(process.env.ENABLE_REDIT)) {
            const reditResult = await crawlInRedit();
            printReportData.socials.push({id: socialNetworks.redit, data: reditResult});
        }

        if(JSON.parse(process.env.ENABLE_STACKOVERFLOW)) {
            const stackoverflowResult = await crawlInStackoverflow();
            printReportData.socials.push({id: socialNetworks.stackOverflow, data: stackoverflowResult});
        }

        if(JSON.parse(process.env.ENABLE_TWITTER)) {
            const twitterResult =  await crawlInTwitter();
            printReportData.socials.push({id: socialNetworks.twitter, data: twitterResult});

        }

        return printReportData;

    } catch (e) {
        console.log("=======Hermes failed to run ===========")
        console.log(`======= Here is the stack trace: ${e} ===========`)
    }
}









