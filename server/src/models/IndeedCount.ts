import mongoose from "mongoose";

export interface IndeedKeywordData {
    name: string;
    count: number;
}

export interface IndeedCountDocument extends mongoose.Document {
    date: Date;
    us: {
        frameworks: Array<IndeedKeywordData>;
        languages: Array<IndeedKeywordData>;
        tools: Array<IndeedKeywordData>;
        jobtitles: Array<IndeedKeywordData>;
    };
    uk: {
        frameworks: Array<IndeedKeywordData>;
        languages: Array<IndeedKeywordData>;
        tools: Array<IndeedKeywordData>;
        jobtitles: Array<IndeedKeywordData>;
    };
}

const IndeedCountSchema = new mongoose.Schema({
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

const IndeedCount = mongoose.model<IndeedCountDocument>("indeed-count", IndeedCountSchema);
export default IndeedCount;