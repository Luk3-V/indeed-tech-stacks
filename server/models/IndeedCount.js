const mongoose = require("mongoose");

const IndeedSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    frameworks: [{
        name: String,
        count: Number
    }],
    languages: [{
        name: String,
        count: Number
    }],
    tools: [{
        name: String,
        count: Number
    }],
    jobtitles: [{
        name: String,
        count: Number
    }]
});

module.exports = mongoose.model('indeedcount', IndeedSchema);