const scraper = require('../indeed-job-scraper/index.js');

const FRAMEWORKS = require('../keywords/frameworks.json');
const TOOLS = require('../keywords/tools.json');
const LANGUAGES = require('../keywords/languages.json');
const JOB_TITLES = require('../keywords/jobtitles.json');


async function getData(params) {
    let data = {
        us: {
            frameworks: [],
            languages: [],
            tools: [],
            jobtitles: []
        },
        uk: {
            frameworks: [],
            languages: [],
            tools: [],
            jobtitles: []
        }
    };

    // ------- SLOW SCRAPER ---------
    data.us.frameworks = await scraper.getAllJobCounts(FRAMEWORKS, 'www');
    data.us.languages = await scraper.getAllJobCounts(LANGUAGES, 'www');
    data.us.tools = await scraper.getAllJobCounts(TOOLS, 'www');
    data.us.jobtitles = await scraper.getAllJobCounts(JOB_TITLES, 'www');
    data.uk.frameworks = await scraper.getAllJobCounts(FRAMEWORKS, 'uk');
    data.uk.languages = await scraper.getAllJobCounts(LANGUAGES, 'uk');
    data.uk.tools = await scraper.getAllJobCounts(TOOLS, 'uk');
    data.uk.jobtitles = await scraper.getAllJobCounts(JOB_TITLES, 'uk');

    // --------- CHUNKED PARALLEL SCRAPER ---------
    // let CHUNK_SIZE = 5;
    // for(let i=0; i<FRAMEWORKS.length; i+=CHUNK_SIZE) {
    //     data.frameworks.push(await Promise.all(FRAMEWORKS.slice(i,i+CHUNK_SIZE).map(async word => {
    //         return await getCount(word, params);
    //     })));
    // }
    // for(let i=0; i<TOOLS.length; i+=CHUNK_SIZE) {
    //     data.tools.push(await Promise.all(TOOLS.slice(i,i+CHUNK_SIZE).map(async word => {
    //         return await getCount(word, params);
    //     })));
    // }
    // for(let i=0; i<LANGUAGES.length; i+=CHUNK_SIZE) {
    //     data.languages.push(await Promise.all(LANGUAGES.slice(i,i+CHUNK_SIZE).map(async word => {
    //         return await getCount(word, params);
    //     })));
    // }
    // for(let i=0; i<JOB_TITLES.length; i+=CHUNK_SIZE) {
    //     data.jobtitles.push(await Promise.all(JOB_TITLES.slice(i,i+CHUNK_SIZE).map(async word => {
    //         return await getCount(word, params);
    //     })));
    // }

    // --------- FAST PARALLEL SCRAPER ---------
    // data.frameworks = await Promise.all(FRAMEWORKS.map(async word => {
    //     return await getCount(word, params);
    // }));
    // data.tools = await Promise.all(TOOLS.map(async word => {
    //     return await getCount(word, params);
    // }));
    // data.languages = await Promise.all(LANGUAGES.map(async word => {
    //     return await getCount(word, params);
    // }));
    // data.jobtitles = await Promise.all(JOB_TITLES.map(async word => {
    //     return await getCount(word, params);
    // }));

    return data;
}

async function getCount(word, params) {
    let count = 0;
    console.log(word.name);
    for(i in word.aliases)
        count += await scraper.getJobCount({ query: word.aliases[i] });

    return {name: word.name, count: count};
}

module.exports = {getData};