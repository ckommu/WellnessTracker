const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bodyParser = require('body-parser');
const logProgressRoute = require('../routes/logProgressRoute.cjs');
const Challenge = require('../models/challengeModel.cjs');
const Progress = require('../models/progressModel.cjs');

let app;
let mongoServer;

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const uri = mongoServer.getUri();
	await mongoose.connect(uri, { dbName: 'testdb' });
	app = express();
	app.use(bodyParser.json());
	app.use('/api/progress', logProgressRoute);
});

afterAll(async () => {
	await mongoose.connection.dropDatabase();
	await mongoose.connection.close();
	await mongoServer.stop();
});

afterEach(async () => {
	await Challenge.deleteMany({});
	await Progress.deleteMany({});
});

test('POST /api/progress logs progress successfully', async () => {
	const testChallenge = await Challenge.create({
		title: 'Test Challenge',
		description: 'Testing, testing!',
		startDate: new Date('2020-04-20'),
		endDate: new Date('2069-04-20'),
		active: true,
		units: 'steps'
	});

	const payload = {
		userId: 'fake-user-123',
		challengeId: testChallenge._id.toString(),
		date: new Date().toISOString(),
		value: 50,
		units: 'steps',
	};

	const response = await request(app)
		.post('/api/progress')
		.send(payload);
	expect(response.statusCode).toBe(201);
	expect(response.body.value).toBe(50);
	expect(response.body.units).toBe('steps');
});