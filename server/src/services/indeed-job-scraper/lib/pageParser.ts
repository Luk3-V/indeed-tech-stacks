import cheerio from "cheerio";
import { config }  from "../config";
import { URL } from "url";

//-----------------------------------------------------------------------------

export default class PageParser {
    $: any;
    cards: any;

    constructor(content: string) {
        this.$ = cheerio.load(content);
        this.cards = this.getJobCards();
    }

    getJobCards() {
        return this.$(config["job-cards"]);
    }

    getJobs() {
        let jobs: any[] = [];
        this.cards.each((index: number, item: string) => {
            let job: any = {}, card = this.$(item);

            job["job-link"] = (new URL(card.find(config["job-link"]).attr("href"), config["base-URL"])).href;
            job["job-title"] = card.find(config["job-title"]).text();
            job["company-name"] = card.find(config["company-name"]).text();
            job["company-location"] = card.find(config["company-location"]).text();
            job["company-rating"] = card.find(config["company-rating"]).text();
            job["job-snippet"] = card.find(config["job-snippet"]).text().trim();
            job["job-salary"] = card.find(config["job-salary"][0]).text().trim() + card.find(config["job-salary"][1]).text().trim();
            job["post-date"] = card.find(config["post-date"]).contents().filter(function(this: any) { return this.type === "text" }).text();

            jobs.push(job);
        });
        return jobs;
    }

    getNextPageLink() {
        let nextHrefList = this.$("ul.pagination-list > li > a[aria-label=Next]").attr("href");
        let nextHrefButton = this.$("nav[role=navigation] > div > a[aria-label='Next Page']").attr("href");
        return (nextHrefList) ? (new URL(nextHrefList, config["base-URL"])).href : ((nextHrefButton) ? (new URL(nextHrefButton, config["base-URL"])).href : null);
    }

    getJobCount() {
        return this.$("div.jobsearch-JobCountAndSortPane-jobCount > span:first-child").text();
    }

    getPageData() {
        return {
            "jobCount": this.getJobCount(),
            "pageJobs": this.getJobs(),
            "nextLink": this.getNextPageLink()
        };
    }
}