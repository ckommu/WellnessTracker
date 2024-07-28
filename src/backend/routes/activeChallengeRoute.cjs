const express = require('express');
const router = express.Router();
const Challenge = require('../models/challengeModel.cjs');

router.get('/active', async (req, res) => {
    try {
        const today = new Date();
        const activeChallenge = await Challenge.findOne({
            startDate: { $lte: today },
            endDate: { $gte: today },
            active: true
        });
        if (activeChallenge) {
            res.status(200).json(activeChallenge);
        } else {
            res.status(404).json({ message: 'No active challenge found.' });
        }
    } catch (err) {
        console.error('Error fetching active challenge: ', err);
        res.status(500).json({ message: 'Error fetching active challenge', error: err.message });
    }
});

module.exports = router;