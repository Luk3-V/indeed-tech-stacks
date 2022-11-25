require('dotenv').config();
require('./lib/cron');

const express = require('express');
var cors = require('cors');
const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.log);
db.on('open', () => console.log("Connected to Database"));

app.use(cors());
app.use(express.json()); 

const IndeedRouter = require('./routes/IndeedRouter');
app.use('/indeed', IndeedRouter);

let server = app.listen(process.env.PORT, () => console.log(`Server up on port: ${process.env.PORT}`));
server.timeout = 0;

//---------------------------------------------------------------------------------------------------

// IDEAS:
// Auto update DB every day
// Remote options
// Uk options
// Job titles category -------
// Add trends data/graphs
// More tools keywords -------
// Light/Dark toggle ------
// store all weekly trend data, only update daily ranking data

// REFACTOR:
// Remake scraper OR create custom scraper module
// Move keywords to DB

// ADVANCED SCRAPER:
// regex check only if b/w spaces or punctuation, no letters
// regex advanced checking for vague keywords ("Play") only if also includes the language ("Java")
// update keywords
// figure out good preset queries (w/ some limit by date or pages)
// Web Developer, Software Developer, Fullstack Developer, Frontend Developer, Backend Developer
// scrape daily for new posts, then add to database. Keeping only last 30 days.
// scrape only top cities
// limit amount of job info promises to await at a time OR cap amount of total jobs to scrape
// add fast option (switch to counting job results)
// - can do location but limited in keywords

// TODO: 
// Make list of lite keywords ----
// Make Lite functions ----
// Implement Lite functions w/ graphs & queries -------
// Make front end ------
// Implement database -----------
// Setup routine DB updates ----------
// Ready code for deployment ----------
// Figure out hosting & domain -----------
// SHIP! --------
// Tweet & post on website