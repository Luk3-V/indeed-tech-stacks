const scraper = require('../indeed-job-scraper/index.js');

const FRAMEWORKS = require('../keywords/lite/frameworks.json');
const TOOLS = require('../keywords/lite/tools.json');
const LANGUAGES = require('../keywords/lite/languages.json');
const JOB_TITLES = require('../keywords/lite/jobtitles.json');


async function getData(params) {
    let data = {
        frameworks: [],
        languages: [],
        tools: [],
        jobtitles: []
    };

    //data.frameworks = await scraper.getAllJobCounts(FRAMEWORKS);
    data.frameworks = await Promise.all(FRAMEWORKS.map(async word => {
        return await getCount(word, params);
    }));
    data.tools = await Promise.all(TOOLS.map(async word => {
        return await getCount(word, params);
    }));
    data.languages = await Promise.all(LANGUAGES.map(async word => {
        return await getCount(word, params);
    }));
    data.jobtitles = await Promise.all(JOB_TITLES.map(async word => {
        return await getCount(word, params);
    }));

    return data;
}

async function getCount(word, params) {
    let count = 0;

    for(i in word.aliases)
        count += await scraper.getJobCount({ query: word.aliases[i] });

    return {name: word.name, count: count};
}

module.exports = {getData};

// implement more params
// implement new scraper that doesnt close pages, grabs counts faster
// figure out fastest way to scrape multiple pages