require('dotenv').config();
const request = require("supertest");
const createServer = require("../utils/app");
const List = require("../models/list.model")
const mongoose = require('mongoose');

const app = createServer();
const mongoDB = process.env.MONGODB_URL;

exports.list_payload = {
    name: "1",
}

describe('List API testing', () => {

    //Connect to database before test
    beforeAll(async () => {
        try {
            // Create connection
            const database = await mongoose.connect(mongoDB);
            console.log(`DB is connected to ${mongoDB}`);

            // Drop any database is created before
            await database.connection.db.dropDatabase();

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
    describe('GET /list/all', () => {
        test("respond with 404", async () => {
            const res = await request(app).get('/api/list/all')
                .set('Accept', 'application/json');
            expect(res.status).toBe(404);
        })
    });

    describe('GET /list/:id', () => {
        test("respond with 404", async () => {
            const list_id = 'list_1234';
            const res = await request(app).get(`/api/list/${list_id}`)
                .set('Accept', 'application/json');
            expect(res.status).toBe(404);
        });
        test("respond with 200", async () => {
            const list = await List.create(this.list_payload);
            const res = await request(app).get(`/api/list/${list.list_id}`)
                .set('Accept', 'application/json');
            console.log(res)
            expect(res.status).toBe(200);
            expect(res.body.list_id).toBe(list.list_id);
        });
    });

    describe('POST /list/create', () => {
        test("respond with 200", async () => {
            const res = await request(app).post('/api/list/create')
                .send(this.list_payload)
                .set('Accept', 'application/json');
            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                __v: 0,
                _id: expect.any(String),
                list_id: expect.any(String),
                name: this.list_payload.name,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            })
        })
    });

    describe('GET /list/all', () => {
        test("respond with 200", async () => {
            const res = await request(app).get('/api/list/all')
                .set('Accept', 'application/json');
            expect(res.status).toBe(200);
        })
    });
})