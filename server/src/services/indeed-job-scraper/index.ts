import { Keyword } from '../../keywords/keyword';
import { IndeedKeywordData } from '../../models/IndeedCount';
import { parse } from "url";
import PageParser from "./lib/pageParser";
import BrowserPage from "./lib/browser";
import { filterParams , checkParamValue } from "./lib/utils/validator";
import { config } from "./config";
import PdfGenerator from "./lib/pdfGenerator";
import JobInfoParser from "./lib/jobInfoParser";
import { Params } from './indeedScraper';

//-----------------------------------------------------------------------------

function getJobCount(params: Params) {
    let page = new BrowserPage();
    params = checkParamValue(filterParams(params));
    let url = new URL("jobs" , config["base-URL"]);

    let content = (async () => {
        try {
            return await page.getContent(url, params);
        }
        catch (err) {
            console.error(err);
            return null;
        }
    })();

    return content.then(async (content) => {
        if(!content)
            return 0;
        if(config["verbose"]) console.log("\u2714" , url.href);
        let parser = new PageParser(content);
        let { jobCount } = parser.getPageData();
        console.log(jobCount);
        return page.closePage().then(() => parseInt(jobCount.substring(0, jobCount.indexOf(" ")).replace(",","")));
    });
}

async function getAllJobCounts(keywords: Array<Keyword>, prefix: string) {
	let page = new BrowserPage();
	let params = {};
	let result: Array<IndeedKeywordData> = [];

    let requests = 0;
	for(let keyword of keywords) {
		let count = 0;
		console.log(keyword.name);

		for(let alias of keyword.aliases) {
            // Prevent bot detection
            if(requests >= 4) { 
                console.log('WAITING 40 SECS');
                await sleep(40000);
                requests = 0;
            }
            requests++;

			let url = new URL("jobs" , `https://${prefix}.indeed.com/`);
			try {
				//let content = await asyncCallWithTimeout(page.getContent(url, {q: keywords[i].aliases[j]}), 90000);
				let content = await page.getContent(url, {q: alias});
				
				if(config["verbose"]) console.log("\u2714" , url.href);
				let parser = new PageParser(content);
				let { jobCount } = parser.getPageData();
				
				let result = parseInt(jobCount.substring(0, jobCount.indexOf(" ")).replace(",",""));
				if(result >= 0) {
					if(count < result) {
						count = result;
					}	
				}
				else
					console.log("ERROR: SCRAPED A NaN");
					
			} catch (error: any) {
				console.log(error.message);
				continue;
			}
		}

		console.log(count);
		result.push({name: keyword.name, count: count});
	}
	
	return page.closePage().then(() => result);
}

function getJobsList(params: Params) {
    let page = new BrowserPage();
    params = checkParamValue(filterParams(params));
    let limit = config["max-pages"];

    // Recursively fetches job listings from multiple pages.
    let jobs = (function _getJobsList(params, jobs: any[] = []) {
        if (limit-- === 0) return Promise.resolve(jobs);
        let url = new URL("jobs", config["base-URL"]);

        return page.getContent(url, params).then((content: any) => {
            if (config["verbose"]) console.log("\u2714", url.href);
            let parser = new PageParser(content);
            let { pageJobs, nextLink } = parser.getPageData();
            jobs = jobs.concat(pageJobs);
            if (nextLink === null) return jobs;
            else return _getJobsList(parse(nextLink, true)["query"], jobs);
        });
    })(params, []);

    return jobs.then((jobs: any[]) => {
        return page.closePage().then(() => jobs);
    });
}

function getJobInfo(url: URL) {
	let page = new BrowserPage();
	let params = {};

	let job = page.getContent(url, params).then((content: any) => {
		let parser = new JobInfoParser(content);
		return parser.getContent();
	});

	return job.then((job: any) => {
		return page.closePage().then(() => job);
	});
}

// function getJobsPDF(params: Params) {
// 	return getJobsList(params).then((jobs: any) => {
// 		if(config["verbose"]) console.log("\u2714 generating PDF buffer starts...");
// 		return (new PdfGenerator(jobs)).generatePDF().then((buffer) => {
// 			if(config["verbose"]) console.log("\u2714 generating PDF buffer finished...");
// 			return buffer;
// 		})
// 	})
// }

//-----------------------------------------------------------------------------

function release() {
	return BrowserPage.closeBrowser();
}

function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// /**
//  * Call an async function with a maximum time limit (in milliseconds) for the timeout
//  * @param {Promise<any>} asyncPromise An asynchronous promise to resolve
//  * @param {number} timeLimit Time limit to attempt function in milliseconds
//  * @returns {Promise<any> | undefined} Resolved promise for async function call, or an error if time limit reached
//  */
//  const asyncCallWithTimeout = async (asyncPromise, timeLimit) => {
//     let timeoutHandle;

//     const timeoutPromise = new Promise((_resolve, reject) => {
//         timeoutHandle = setTimeout(
//             () => reject(new Error('Async call timeout limit reached')),
//             timeLimit
//         );
//     });

//     return Promise.race([asyncPromise, timeoutPromise]).then(result => {
//         clearTimeout(timeoutHandle);
//         return result;
//     })
// }

//-----------------------------------------------------------------------------

export {
    getAllJobCounts,
    getJobCount,
    getJobsList,
    getJobInfo,
    //getJobsPDF,
    release,
    config
};