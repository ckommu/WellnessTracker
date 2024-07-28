const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const ProgressSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    challengeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    value: {
        type: Schema.Types.Mixed,
        required: false
    },
    units: {
        type: String,
        required: false
    }
});

const Progress = mongoose.model('Progress', ProgressSchema); // ('Progress', ProgressSchema, collection name if needed);

module.exports = Progress;