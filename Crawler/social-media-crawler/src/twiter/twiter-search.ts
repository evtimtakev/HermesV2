import {GET} from "../common/decorators/http/get";
import * as dotenv from 'dotenv';
import {HttpRequest} from "../common/models/http/http-request.model";
import {PrintReportEntryModel} from "../common/models/print-report.model";
import querystring from "querystring";
import moment from "moment";
dotenv.config()

const TWITTER_SEARCH_URL = `${process.env.TWITTER_API_URL}/2/tweets/search/recent`;

export class TwitterSearch {
//#${process.env.TWITTER_PRIMARY_HASHTAG} (#${hashtags.join(" OR #")})
     //+ `%20(${process.env.TWITTER_SEARCH_BY_TERM})`
    @GET(process.env.TWITTER_BEARER_TOKEN)
    public static searchPosts({hashtags, searchText}: {hashtags?: string[], searchText?: string}): HttpRequest | any {
        const query = searchText ?
            `${searchText} lang:${process.env.TWITTER_SEARCH_LANG} -is:retweet`
            : `#${hashtags.join(" OR #")} lang:${process.env.TWITTER_SEARCH_LANG} -is:retweet`;

        const params = querystring.stringify( {
            "query": query,
            "tweet.fields": "entities,source,created_at",
            "max_results": 100
        });

        return {
            url: TWITTER_SEARCH_URL+`?${params}`,
        };
    }

    public static toReportModel(twitterPosts: any[] | undefined): PrintReportEntryModel[] {
        return twitterPosts?.filter(posts => posts.text).map((item) =>  {
            let mediaDesc = [];

            if(item.entities?.urls) {
                mediaDesc = item.entities.urls?.filter(url => url.title).map(url => {
                    return `SHARED RESOURCE IN TWEET:</br> Title: ${url.title}</br> Description: ${url.description} </br> Link: ${url.expanded_url}`
                })
            }

           return {
               description: mediaDesc.join("</br></br>"),
               title: item?.text,
               url: `${process.env.TWITTER_URL}/allvirtual/status/${item.id}`,
               created: moment(item.created_at).format("MM/DD/YYYY")
           }
            }
        )
    }

}
