const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Progress = require('../models/progressModel.cjs');
const Challenge = require('../models/challengeModel.cjs');

router.use(bodyParser.json());

router.get('/', (req, res) => {
    res.send('logProgress route is working!!');
});

router.post('/', async (req, res) => {
    console.log('Received POST request!');
    
    const { userId, challengeId, date, value, units } = req.body;
    console.log('Request body:', req.body);

    try {
        console.log('Looking for challenge with ID:', challengeId);
        const challenge = await Challenge.findById(challengeId);
        console.log('Fetched challenge:', challengeId);
        const today = new Date();

        if (!challenge) {
            console.error('Challenge not found');
            return res.status(404).json({ message: 'Challenge not found.' });
        }

        if (!challenge.active || today < new Date(challenge.startDate) || today > new Date(challenge.endDate)) {
            console.error('Challenge not active or out of date range');
            return res.status(400).json({ message: 'This challenge is not currently active.' });
        }

        const existingProgress = await Progress.findOne({ userId, challengeId, date });
        console.log('Fetched existing progress:', existingProgress);

        if (existingProgress) {
            existingProgress.value += value;
            await existingProgress.save();
            console.log('Updated progress:', existingProgress);
            return res.status(200).json(existingProgress);
        } else {
            const progress = new Progress({
                userId,
                challengeId,
                date,
                value,
                units
            });
            await progress.save();
            console.log('Created new progress:', progress);
            return res.status(201).json(progress);
        }
    } catch (err) {
        console.error('Error logging progress: ', err);
        return res.status(500).json({ message: 'Error logging progress', error: err.message });
    }
});

router.get('/leaderboard', async (req, res) => {
    try {
      const Challenge = require('../models/challengeModel.cjs');
      const Progress = require('../models/progressModel.cjs');
      const User = require('../models/userModel.cjs');
  
      // Step 1: Get the active challenge
      const activeChallenge = await Challenge.findOne({ active: true });
      if (!activeChallenge) {
        return res.status(404).json({ message: 'No active challenge found.' });
      }
  
      // Step 2: Get all users
      const users = await User.find();
  
      // Step 3: Get all progress logs for this challenge
      const logs = await Progress.find({ challengeId: activeChallenge._id });
  
      // Step 4: Merge users + logs
      const leaderboard = users.map(user => {
        const entry = logs.find(log => log.userId === user.clerkUserId);
        return {
          name: `${user.firstName} ${user.lastName}`,
          value: entry?.value || null,
          unit: entry?.units || '',
        };
      });
  
      res.json(leaderboard);
    } catch (err) {
      console.error('Error in leaderboard route:', err);
      res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  });  

module.exports = router;
