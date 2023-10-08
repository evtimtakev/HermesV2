import {GET} from "../common/decorators/http/get";
import * as dotenv from 'dotenv';
import {HttpRequest} from "../common/models/http/http-request.model";
import {PrintReportEntryModel} from "../common/models/print-report.model";
import moment from "moment";
dotenv.config()

const STACKOVERFLOW_SEARCH_URL = `${process.env.STACKOVERFLOW_URL}/2.3/search/advanced`;

export class StackoverflowSearch {

    @GET()
    public static searchPosts(term: string, fromDate: number): HttpRequest | any {
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

    public static toReportModel(stackOverflowPosts: any[]): PrintReportEntryModel[] {
        return stackOverflowPosts.map((item) => ({
            description: `Tags: ${item.tags.join(", ")}`,
            title: item.title,
            url: item.link,
            created: moment.unix(item.creation_date).format("MM/DD/YYYY")
        }))
    }

}