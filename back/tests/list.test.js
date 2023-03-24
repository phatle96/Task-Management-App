const request = require("supertest");
const app = require("../utils/app");
const db = require("../utils/db");
const mongoose = require('mongoose');

require('dotenv').config();
const mongoDB = process.env.MONGODB_URL

describe('Test List API', () => {

	//Connect to database before test
	beforeAll(async () => {
        try {
            await mongoose.connect(mongoDB);
            console.log(`DB is connected to ${mongoDB}`);
        } catch (err) {
            console.log(`Could not connect to DB (${mongoDB})`);
        }
	});

	// Disconnect to database after test
	afterAll(async () => {
        try {
            await mongoose.disconnect();
            await mongoose.connection.close();
            console.log('DB is disconnected')
        } catch (err) {
            console.log('Could not disconnect to DB');
        }
	});

	// Get list route
	describe('Get all list', () => {
		test("It should return 200", async () => {
			const res = await request(app).get('/list/all');
			expect(res.statusCode).toBe(200);
		})
	})
})