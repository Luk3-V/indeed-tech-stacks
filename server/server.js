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