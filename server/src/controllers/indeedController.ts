import { Response, Request, NextFunction } from "express";
import IndeedCount from '../models/IndeedCount';
import * as IndeedScraper from '../services/IndeedScraper';

// ---------------------------------------------------------------------

export async function getAllData(req: Request, res: Response, next: NextFunction) {
    try {
        const allData = await IndeedCount.find();
        res.json(allData);
    } catch (error: any) {
        res.status(500).json({ message: error.message }); // 500 = Server error
    }
}

export async function getData(req: Request, res: Response, next: NextFunction) {
    let date = getDateObject(req.params.date);

    try {
        let data = await IndeedCount.find({date: {$lte: date}}).sort({date: -1});
        if(data) {
            res.json(data[0]); 
        } else {
            res.status(404).json({ message: "Cannot find data." }); // 404 = Couldnt find object
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message }); // 500 = Server error
    }
}

export async function createData(req: Request, res: Response, next: NextFunction){
    try {
        console.log("🟢 STARTED SCRAPING");
        let data = new IndeedCount( await IndeedScraper.getScrapedData() );
        await data.save();
        res.status(200).json(data);
        console.log("🔵 DONE SCRAPING");
    } catch (error: any) {
        res.status(500).json({ message: error.message }); // 500 = Server error
    }
}

export async function deleteData(req: Request, res: Response, next: NextFunction) {
    let date = getDateObject(req.params.date);

    try {
        let data = await IndeedCount.find({date: {$lte: date}}).sort({date: -1});
        if(data) {
            await data[0].remove();
            res.json({ message: "Deleted data." });
        } else {
            res.status(404).json({ message: "Cannot find data." }); // 404 = Couldnt find object
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message }); // 400 = User input error
    }
}

// ---------------------------------------------------------------------

function getDateObject(dateString: string): Date {
    let date;
    if (dateString === "newest")
        date = new Date();
    else
        date = new Date(dateString+"T00:00:00");
    date.setDate(date.getDate() + 1);

    return date;
}