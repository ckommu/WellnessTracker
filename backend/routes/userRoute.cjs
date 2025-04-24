const express = require('express');
const { Webhook } = require('svix');
const bodyParser = require('body-parser');
const router = express.Router();
const User = require('../models/userModel.cjs');

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
console.log('CLERK WH SECRET FROM userRoute.cjs: ', CLERK_WEBHOOK_SECRET);

router.use(bodyParser.json());


// GET REQUEST
router.get('/', (req, res) => {
        res.send('/users endpoint is working!!');
});

// POST REQUEST
router.post('/', async (req, res) => {
        try {
            const payload = req.body;
            console.log('Payload: ', payload);

            const { id, first_name, last_name, email_addresses } = payload.data;
            const email = email_addresses && email_addresses.length > 0 ? email_addresses[0].email_address : null;

            const user = new User({
                clerkUserId: id,
                firstName: first_name,
                lastName: last_name,
                email: email
            });

            await user.save();
            console.log('User saved to DB!');

            res.status(200).send('User saved successfully :)');
        } catch(err) {
            console.error('Error getting/saving user: ', err);
            res.status(500).send('Internal server error T____T');
        }
     }
);

router.get('/all', async (req, res) => {
    try {
        const users = await User.find({}, '-__v');
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users: ', err);
        res.status(500).json({ message: 'Error fetching users' });
    }
});

module.exports = router;
