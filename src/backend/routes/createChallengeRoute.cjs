const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Challenge = require('../models/challengeModel.cjs');

router.use(bodyParser.json());

router.get('/', (req, res) => {
    res.send('create challenge endpoint is working!!');
});

router.post('/', async (req, res) => {
    console.log('Received POST request');
    try {
        const payload = req.body;
        console.log('Payload: ', payload); 

        const { title, description, startDate, endDate, units, active, weeklyGoals } = payload;
        const challenge = new Challenge({
            title,
            description,
            startDate,
            endDate,
            units,
            active,
            weeklyGoals
        });

        const savedChallenge = await challenge.save();
        res.status(200).json(savedChallenge);
    } catch (err) {
        console.error("Problem posting request: ", err);
        res.status(500).send("something's wrong w/the server T___T");
    }
});

module.exports = router;
