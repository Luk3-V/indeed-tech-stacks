let { parse } 	 					   = require("url");
let PageParser 						   = require("./lib/page-parser.js");
let BrowserPage    					   = require("./lib/browser.js");
let { filterParams , checkParamValue } = require("./lib/utils/validator.js");
let config     						   = require("./config.js");
let PdfGenerator 					   = require("./lib/pdfGenerator.js");
const JobInfoParser = require("./lib/job-info-parser.js");

//-----------------------------------------------------------------------------

function getJobCount(params) {
	let page  = new BrowserPage();
	params    = checkParamValue(filterParams(params));
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
		let { jobCount } = parser.getContent();
		console.log(jobCount);
		return page.closePage().then(() => parseInt(jobCount.substring(0, jobCount.indexOf(" ")).replace(",","")));
	});
}

//-----------------------------------------------------------------------------

async function getAllJobCounts(keywords, prefix) {
	let page  = new BrowserPage();
	let params = {};
	
	let requests = 0;
	let result = [];
	for(i in keywords) {
		if(requests >= 4) { // Prevent bot detection
			console.log('WAITING 40 SECS');
			await sleep(40000);
			requests = 0;
		}

		let count = 0;
		console.log(keywords[i].name);
		for(j in keywords[i].aliases) {
			let url = new URL("jobs" , `https://${prefix}.indeed.com/`);
			try {
				//let content = await asyncCallWithTimeout(page.getContent(url, {q: keywords[i].aliases[j]}), 90000);
				let content = await page.getContent(url, {q: keywords[i].aliases[j]});
				
				if(config["verbose"]) console.log("\u2714" , url.href);
				let parser = new PageParser(content);
				let { jobCount } = parser.getContent();
				
				let result = parseInt(jobCount.substring(0, jobCount.indexOf(" ")).replace(",",""));
				if(result >= 0) {
					if(count < result) {
						count = result;
					}	
				}
				else
					console.log("ERROR: SCRAPED A NaN");
					
			} catch (error) {
				console.log(error.message);
				j-=1 
				continue;
			}
		}
		requests++;
		console.log(count);
		result.push({name: keywords[i].name, count: count});
	}
	
	return page.closePage().then(() => result);
}

//-----------------------------------------------------------------------------

function getJobsList(params) {
	let page  = new BrowserPage();
	params    = checkParamValue(filterParams(params));
	let limit = config["max-pages"];

	let jobs  = (function _getJobsList(params , jobs = []) {
		if(limit-- === 0) return Promise.resolve(jobs);
		let url = new URL("jobs" , config["base-URL"]);

		return page.getContent(url, params).then((content) => {
			if(config["verbose"]) console.log("\u2714" , url.href);
			let parser = new PageParser(content);
			let { pageJobs , nextLink } = parser.getContent();
			jobs = jobs.concat(pageJobs);
			if(nextLink === null) return jobs;
			else return _getJobsList(parse(nextLink , true)["query"] , jobs);
		})
	})(params , []);

	return jobs.then((jobs) => {
		return page.closePage().then(() => jobs);
	});
}

// ----------------------------------------------------------------------------

function getJobInfo(url) {
	let page    = new BrowserPage();
	let params  = [];

	let job     = page.getContent(url, params).then((content) => {
		let parser = new JobInfoParser(content);
		return parser.getContent();
	});

	return job.then((job) => {
		return page.closePage().then(() => job);
	});
}

//-----------------------------------------------------------------------------

function getJobsPDF(params) {
	return getJobsList(params).then((jobs) => {
		if(config["verbose"]) console.log("\u2714 generating PDF buffer starts...");
		return (new PdfGenerator(jobs)).generatePDF().then((buffer) => {
			if(config["verbose"]) console.log("\u2714 generating PDF buffer finished...");
			return buffer;
		})
	})
}

//-----------------------------------------------------------------------------

function release() {
	return BrowserPage.closeBrowser();
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Call an async function with a maximum time limit (in milliseconds) for the timeout
 * @param {Promise<any>} asyncPromise An asynchronous promise to resolve
 * @param {number} timeLimit Time limit to attempt function in milliseconds
 * @returns {Promise<any> | undefined} Resolved promise for async function call, or an error if time limit reached
 */
 const asyncCallWithTimeout = async (asyncPromise, timeLimit) => {
    let timeoutHandle;

    const timeoutPromise = new Promise((_resolve, reject) => {
        timeoutHandle = setTimeout(
            () => reject(new Error('Async call timeout limit reached')),
            timeLimit
        );
    });

    return Promise.race([asyncPromise, timeoutPromise]).then(result => {
        clearTimeout(timeoutHandle);
        return result;
    })
}

//-----------------------------------------------------------------------------

exports.getAllJobCounts = getAllJobCounts;
exports.getJobCount = getJobCount;
exports.getJobsList = getJobsList;
exports.getJobInfo = getJobInfo;
exports.getJobsPDF  = getJobsPDF;
exports.release     = release;
exports.config      = config;