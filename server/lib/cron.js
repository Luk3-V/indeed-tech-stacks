const cron = require('node-cron');
const IndeedCount = require('../models/IndeedCount');
const IndeedScraperLite = require('../lib/indeedScraperLite');

// 9 AM EET (Railway server) = 1 AM CST 
cron.schedule('0 9 * * *', async () => { 
    console.log('RUNNING CRON: SCRAPE INDEED');
    let data = new IndeedCount( await IndeedScraperLite.getData({}) );
    data.save().then(() => console.log('CRON FINISHED!'));
})