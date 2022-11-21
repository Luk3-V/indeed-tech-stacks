const { getJobsList, getJobInfo, getJobsPDF, release, config } = require('../indeed-job-scraper/index');

const FRAMEWORKS = require('../keywords/frameworks.json');
const TOOLS = require('../keywords/tools.json');
const LANGUAGES = require('../keywords/languages.json');
const LIBRARIES = require('../keywords/libraries.json');


async function getKeywordData(params) {
    const allKeywords = await getAllKeywords(params);
    let keywordData = {
        jobCount: 0,
        frameworks: [],
        tools: [],
        languages: [],
        libraries: [],
    };

    allKeywords.forEach(job => {
        keywordData.jobCount++;
        keywordData.frameworks = updateDataArray(keywordData.frameworks, job.frameworks);
        keywordData.tools = updateDataArray(keywordData.tools, job.tools);
        keywordData.languages = updateDataArray(keywordData.languages, job.languages);
        keywordData.libraries = updateDataArray(keywordData.libraries, job.libraries);
    })
    console.log("DONE!");

    return keywordData;
}

async function getAllKeywords(params) {
    const jobs = await getJobsList(params);
    //jobs = require('./jobsExample.json');
    let allKeywords = [];
    console.log(jobs.length);

    await Promise.all(jobs.map(async (job) => {
        //const keywords = await getJobKeywords(new URL(jobs[1]["job-link"]));
        const keywords = await getJobKeywords(new URL(job["job-link"]));
        allKeywords.push(keywords);
    }));
    console.log("END ALL");
    return allKeywords;
}

async function getJobKeywords(url) {
    console.log("START INFO");
    const job = await getJobInfo(url);
    console.log("END INFO");
    //job = require('./jobExample.json');
    const description = job["job-description"];
    let keywords = {
        url: url,
        frameworks: [],
        tools: [],
        languages: [],
        libraries: [],
    };

    FRAMEWORKS.forEach(word => {
        if (hasKeyword(description, word))
            keywords.frameworks.push(word.name);
    });

    TOOLS.forEach(word => {
        if (hasKeyword(description, word))
            keywords.tools.push(word.name);
    });

    LANGUAGES.forEach(word => {
        if (hasKeyword(description, word))
            keywords.languages.push(word.name);
    });

    LIBRARIES.forEach(word => {
        if (hasKeyword(description, word))
            keywords.libraries.push(word.name);
    });

    return keywords;
}

//---------------------------------------------------------------------------------------------

function updateDataArray(dataArray, keywords) {
    let newArray = [...dataArray];


    keywords.forEach(word => {
        const i = dataArray.findIndex(obj => obj.name === word);
        if (i >= 0)
            newArray[i].count++;
        else
            newArray.push({
                name: word,
                count: 1
            });
    });

    return newArray;
}

function hasKeyword(string, word) {
    const regex = [word.name, ...word.aliases].map(x => escapeRegex(x)).join("|");
    return new RegExp(regex, "i").test(string);
}

function escapeRegex(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

module.exports = {getKeywordData};