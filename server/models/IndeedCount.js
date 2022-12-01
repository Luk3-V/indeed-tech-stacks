const mongoose = require("mongoose");

const IndeedSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    us: {
        frameworks: [{
            name: String,
            count: {
                type: Number,
                default: 0
            }
        }],
        languages: [{
            name: String,
            count: {
                type: Number,
                default: 0
            }
        }],
        tools: [{
            name: String,
            count: {
                type: Number,
                default: 0
            }
        }],
        jobtitles: [{
            name: String,
            count: {
                type: Number,
                default: 0
            }
        }]
    },
    uk: {
        frameworks: [{
            name: String,
            count: {
                type: Number,
                default: 0
            }
        }],
        languages: [{
            name: String,
            count: {
                type: Number,
                default: 0
            }
        }],
        tools: [{
            name: String,
            count: {
                type: Number,
                default: 0
            }
        }],
        jobtitles: [{
            name: String,
            count: {
                type: Number,
                default: 0
            }
        }]
    }
});

module.exports = mongoose.model('indeed-count', IndeedSchema);