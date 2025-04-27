require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/userModel.cjs');

const dummyUsers = [
    {
        clerkUserId: 'user_dummy1',
        firstName: 'Moon',
        lastName: 'Knight',
        email: 'moonknight@konshu.org'
    },
    {
        clerkUserId: 'user_dummy2',
        firstName: 'Steven',
        lastName: 'Strange',
        email: 'exsurgeon@magic.com'
    },
    {
        clerkUserId: 'user_dummy3',
        firstName: 'Rocket',
        lastName: 'Racoon',
        email: 'rocket@guardians.com'
    },
    {
        clerkUserId: 'user_dummy4',
        firstName: 'Loki',
        lastName: 'Odinson',
        email: 'fuckasgard@mischief.com'
    },
];

async function seed() {
    try {
        await mongoose.connect(process.env.ATLAS_URI, { dbName: 'synergplus' });
        console.log('Connected to db!');

        await User.insertMany(dummyUsers);
        console.log('Dummies inserted!');

        process.exit();
    } catch (err) {
        console.error('Seeding error: ', err);
        process.exit(1);
    }
}

seed();