import cron from 'node-cron';
import IndeedCount from '../models/IndeedCount';
import * as IndeedScraper from './IndeedScraper';

// 6 AM UTC/GMT = 12 AM CST 
cron.schedule('0 6 * * *', async () => { 
    console.log('RUNNING CRON: SCRAPE INDEED');
    let data = new IndeedCount( await IndeedScraper.getScrapedData() );
    data.save().then(() => console.log('CRON FINISHED!'));
})