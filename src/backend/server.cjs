require('dotenv').config({ path: '../../.env' });
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const userRoute = require('./routes/userRoute.cjs'); // userRoute = module.exports = router so userRoute = router
const createChallengeRoute = require('./routes/createChallengeRoute.cjs');
const logProgressRoute = require('./routes/logProgressRoute.cjs');
const activeChallengeRoute = require('./routes/activeChallengeRoute.cjs');
const Challenge = require('./models/challengeModel.cjs');

// MONGODB URL FROM .ENV
const DB_URL = process.env.ATLAS_URI;
console.log('DB_URL from server.cjs: ', DB_URL);

// PORT FROM .ENV OR IF NO PORT EXISTS, DEFAULT TO PORT 5173
const PORT = process.env.PORT || 5173;
console.log('PORT from server.cjs: ', PORT)

// PRINTING WEBHOOK SECRET TO MAKE SURE ITS CORRECT (IT IS)
console.log('WEBHOOK SECRET from server.cjs: ', process.env.CLERK_WEBHOOK_SECRET);

const app = express();
app.use(cors());

mongoose.connect(DB_URL, {
    dbName:'synergplus'
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error: ', err));


app.use('/users', userRoute); // app.use('endpoint URL', what you've named the file containing logic for /users)
app.use('/challenge', createChallengeRoute); 
app.use('/progress', logProgressRoute);
app.use('/challenges', activeChallengeRoute);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
});

// SCHEDULER
// cron.schedule('0 0 * * *) -> runs at the end of every day
// cron.schedule('* * * * *) -> runs every minute - use for testing!!
cron.schedule('0 0 * * *', async () => {
    const today = new Date();

    try {
        // $lt = less than, $lte = less than or equal to, $gte = greater than or equal to (mongodb query language)
        await Challenge.updateMany({ endDate: { $lt: today } }, { active: false });
        await Challenge.updateMany({ startDate: { $lte: today }, endDate: { $gte: today } }, { active: true });

        console.log('Challenges updated based on current date. ');
    } catch(err) {
        console.error('Error updating challenge(s): ', err);
    }
});


