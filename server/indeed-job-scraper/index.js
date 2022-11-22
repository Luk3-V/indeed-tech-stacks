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

	return page.getContent(url, params).then(async (content) => {
		if(config["verbose"]) console.log("\u2714" , url.href);
		let parser = new PageParser(content);
		let { jobCount } = parser.getContent();
		console.log(jobCount);
		return page.closePage().then(() => parseInt(jobCount.substring(0, jobCount.indexOf(" ")).replace(",","")));
	});
}

//-----------------------------------------------------------------------------

async function getAllJobCounts(keywords) {
	let page  = new BrowserPage();
	let params = {};
	
	let requests = 0;
	let result = [];
	for(i in keywords) {
		if(requests >= 5) { // Prevent bot detection
			console.log('WAITING 20 SECS');
			await sleep(20000);
			requests = 0;
		}

		let count = 0;
		console.log(keywords[i].name);
		for(j in keywords[i].aliases) {
			let url = new URL("jobs" , config["base-URL"]);
			count += await page.getContent(url, {q: keywords[i].aliases[j]}).then((content) => {
				if(config["verbose"]) console.log("\u2714" , url.href);
				let parser = new PageParser(content);
				let { jobCount } = parser.getContent();
				return parseInt(jobCount.substring(0, jobCount.indexOf(" ")).replace(",",""));
			});
		}
		requests++;
		console.log(count);
		result.push({name: keywords[i].name, count: count});
	}

	// let result = await Promise.all(keywords.map(async word => {
	// 	let count = 0;
	// 	console.log(word.name);
	// 	for(j in word.aliases) {
	// 		let url = new URL("jobs" , config["base-URL"]);
	// 		params  = checkParamValue(filterParams({query: word.aliases[j]}));
	// 		count += await page.getContent(url, params).then((content) => {
	// 			console.log("test");
	// 			if(config["verbose"]) console.log("\u2714" , url.href);
	// 			let parser = new PageParser(content);
	// 			let { jobCount } = parser.getContent();
	// 			return parseInt(jobCount.substring(0, jobCount.indexOf(" ")).replace(",",""));
	// 		});
	// 	}
	// 	console.log(count);
	//  	result.push({name: word.name, count: count});
	// }));

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

//-----------------------------------------------------------------------------

exports.getAllJobCounts = getAllJobCounts;
exports.getJobCount = getJobCount;
exports.getJobsList = getJobsList;
exports.getJobInfo = getJobInfo;
exports.getJobsPDF  = getJobsPDF;
exports.release     = release;
exports.config      = config;