const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChallengeSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    units: {type: String, required: true},
    active: {type: Boolean, default: false},
    weeklyGoals: {type: [String], required: false},
});

const Challenge = mongoose.model('Challenge', ChallengeSchema, 'challenges');

module.exports = Challenge;

