import dotenv from 'dotenv';
dotenv.config();
import './services/cron';

import express from "express";
import cors from "cors";
import mongoose from 'mongoose';

import IndeedRouter from './routes/indeedRouter';
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL || "";

// ---------------------------------------------------------------------

const app = express();
app.use(cors());
app.use(express.json()); 
app.use('/indeed', IndeedRouter);

mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on('error', console.log);
db.on('open', () => console.log("Connected to Database"));

let server = app.listen(PORT, () => console.log(`Server up on port: ${PORT}`));
server.timeout = 0;