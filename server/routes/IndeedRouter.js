const express = require('express');
const router = express.Router();
const IndeedCount = require('../models/IndeedCount');
const IndeedScraperLite = require('../lib/indeedScraperLite');

// GET all data
router.get('/', async (req, res) => {
    try {
        const allData = await IndeedCount.find();
        res.json(allData);
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 = Server error
    }
});

// GET data by date (YYYY-MM-DD) OR by "newest"
router.get('/:date', getData, (req, res) => {
    res.json(res.data);
});

// POST new data for the current day
router.post('/', async (req, res) => {
    // let data = new IndeedData({
    //     frameworks: [],
    //     tools: [],
    //     languages: [],
    //     libraries: []
    // });
    let data = new IndeedCount( await IndeedScraperLite.getData({}) );

    try {
        const newData = await data.save();
        res.status(201).json(newData); // 201 = Object created
    } catch (error) {
        res.status(400).json({ message: error.message }); // 400 = User input error
    }
});

// DELETE data by date (YYYY-MM-DD)
router.delete('/:date', getData, async (req, res) => {
    try {
        await res.data.remove();
        res.json({ message: "Deleted data." });
    } catch (error) {
        res.status(500).json({ message: error.message }); // 400 = User input error
    }
});

// --------------------------------------------------------------------

// Return data based on date (YYYY-MM-DD)
async function getData(req, res, next) {
    let date;
    if (req.params.date === "newest")
        date = new Date();
    else
        date = new Date(req.params.date+"T00:00:00");
    date.setDate(date.getDate() + 1);
    let data;

    try {
        data = await IndeedCount.find({date: {$lte: date}}).sort({date: -1});
        if(data == null) {
            res.status(404).json({ message: "Cannot find data." }); // 404 = Couldnt find object
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 = Server error
    }

    res.data = data[0];
    next();
}

module.exports = router;