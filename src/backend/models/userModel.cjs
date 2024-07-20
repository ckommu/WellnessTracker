const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    clerkUserId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true},
    lastName: { type: String, required: true },
    email: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;