import { Keyword } from '../keywords/keyword';
import { getAllJobCounts, getJobCount } from './indeed-job-scraper';

import FRAMEWORKS from '../keywords/frameworks.json';
import TOOLS from '../keywords/tools.json';
import LANGUAGES from '../keywords/languages.json';
import JOB_TITLES from '../keywords/jobtitles.json';

// --------------------------------------------------------------------

export async function getScrapedData() {
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
    data.us.frameworks = await getAllJobCounts(FRAMEWORKS, 'www');
    data.us.languages = await getAllJobCounts(LANGUAGES, 'www');
    data.us.tools = await getAllJobCounts(TOOLS, 'www');
    data.us.jobtitles = await getAllJobCounts(JOB_TITLES, 'www');
    data.uk.frameworks = await getAllJobCounts(FRAMEWORKS, 'uk');
    data.uk.languages = await getAllJobCounts(LANGUAGES, 'uk');
    data.uk.tools = await getAllJobCounts(TOOLS, 'uk');
    data.uk.jobtitles = await getAllJobCounts(JOB_TITLES, 'uk');

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

async function getCount(keyword: Keyword) {
    let count = 0;
    console.log(keyword.name);
    for(let i in keyword.aliases)
        count += await getJobCount({ query: keyword.aliases[i] });

    return {name: keyword.name, count: count};
}