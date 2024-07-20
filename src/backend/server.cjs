require('dotenv').config({ path: '../../.env' });
const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute.cjs'); // userRoute = module.exports = router so userRoute = router

// MONGODB URL FROM .ENV
const DB_URL = process.env.ATLAS_URI;
console.log('DB_URL from server.cjs: ', DB_URL);

// PORT FROM .ENV OR IF NO PORT EXISTS, DEFAULT TO PORT 5173
const PORT = process.env.PORT || 5173;
console.log('PORT from server.cjs: ', PORT)

// PRINTING WEBHOOK SECRET TO MAKE SURE ITS CORRECT (IT IS)
console.log('WEBHOOK SECRET from server.cjs: ', process.env.CLERK_WEBHOOK_SECRET);

const app = express();
app.use(express.json());

mongoose.connect(DB_URL, {
    dbName:'synergplus'
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error: ', err));


app.use('/users', userRoute); // app.use('endpoint URL', what you've named the file containing logic for /users)w

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
});


