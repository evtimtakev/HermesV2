import {GET} from "../common/decorators/http/get";
import * as dotenv from 'dotenv';
import {HttpRequest} from "../common/models/http/http-request.model";
import {PrintReportEntryModel} from "../common/models/print-report.model";
import moment from "moment";
dotenv.config()

const REDIT_SEARCH_URL = `${process.env.REDIT_URL}/${process.env.REDIT_SUBREDIT_NAME}/search.json`;

export class SubreditSearch {

    @GET(null, {"User-Agent": "MockClient/0.1 by Me"})
    public static searchInSubredit(term: string): HttpRequest | any {
        return {
            url: REDIT_SEARCH_URL,
            params: {
                q: term,
                limit: 50,
                sort: "new",
                restrict_sr: "on"
            }
        };
    }

    public static toReportModel(subreditPosts: any[]): PrintReportEntryModel[] {
        return subreditPosts.map(({ data }) => ({
            description: data.selftext,
            title: data.title,
            url: data.url,
            created: moment.unix(data.created_utc).format("MM/DD/YYYY")
        }))
    }

}
