require('dotenv').config();
const mongoose = require('mongoose');
const Progress = require('./models/progressModel.cjs');
const User = require('./models/userModel.cjs');
const Challenge = require('./models/challengeModel.cjs');

async function seedProgress() {
    try {
        await mongoose.connect(process.env.ATLAS_URI, { dbName: 'synergplus' });
        console.log('Connected to Mongo!!');

        const activeChallenge = await Challenge.findOne({ active: true });
        if (!activeChallenge) {
            throw new Error('No active challenge found  D:');
        }
        const users = await User.find();
        if (!users.length) {
            throw new Error('No users found, run seedUsers first!');
        }

        const dummyProgressEntries = users.map((user, index) => {
            if (index % 2 === 0) {
                return {
                    userId: user.clerkUserId,
                    challengeId: activeChallenge._id,
                    date: new Date(),
                    value: Math.floor(Math.random() * 100) + 1,
                    units: activeChallenge.units || 'units'
                };
            } else {
                return null;
            }
        }).filter(Boolean);

        await Progress.insertMany(dummyProgressEntries);
        console.log('Dummy progress entries successfully inserted.');

        process.exit();
    } catch (err) {
        console.error('Seeding error: ', err);
        process.exit(1);
    }
}

seedProgress();