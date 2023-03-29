require('dotenv').config();
const request = require("supertest");
const createServer = require("../utils/app");
const Person = require('../models/person.model');
const mongoose = require('mongoose');

const app = createServer();
const mongoDB = process.env.MONGODB_URL;

exports.payload = {
    valid_person: {
        name: 'a valid person',
    },
    error_person: {
        person_id: '1234',
        name: 'an error person',
    },
    updated_person: {
        name: 'an updated person'
    },
    deleted_person: {
        name: 'a deleted person',
        is_deleted: true
    }
}


describe('Person API testing', () => {

    //Connect to database before test
    beforeEach(async () => {
        try {
            // Create connection
            const database = await mongoose.connect(mongoDB);
            //console.log(`DB is connected to ${mongoDB}`);

            // Drop any database is created before
            await database.connection.db.dropDatabase();

        } catch (err) {
            console.log(`Could not connect to DB (${mongoDB})`);
        }
    });

    // Disconnect to database after test
    afterEach(async () => {
        try {
            await mongoose.disconnect();
            await mongoose.connection.close();
            //console.log('DB is disconnected')
        } catch (err) {
            console.log('Could not disconnect to DB');
        }
    });


    describe('GET /person/:person_id', () => {
        test("respond with 404", async () => {
            const person_id = 'person_1234';
            const res = await request(app).get(`/api/person/${person_id}`)
                .set('Accept', 'application/json');
            expect(res.status).toBe(404);
        });
        test("respond with 200", async () => {
            const payload = this.payload.valid_person;
            const person = await Person.create(payload);
            const res = await request(app).get(`/api/person/${person.person_id}`)
                .set('Accept', 'application/json');
            expect(res.status).toBe(200);
            expect(res.body.person_id).toBe(person.person_id);
        });
    });


    describe('POST /person/create', () => {
        test("respond with 200", async () => {
            const payload = this.payload.valid_person;
            const res = await request(app).post('/api/person/create')
                .send(payload)
                .set('Accept', 'application/json');
            //console.log(res.body)
            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                __v: 0,
                _id: expect.any(String),
                person_id: expect.any(String),
                name: payload.name,
                is_deleted: false,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            });
        });
    });

    describe('POST /person/create', () => {
        test("respond with 400", async () => {
            const payload = this.payload.error_person;
            const res = await request(app).post('/api/person/create')
                .send(payload)
                .set('Accept', 'application/json');
            expect(res.status).toBe(400);
        });
    });

    describe('PUT /person/:id/update', () => {
        test('response with 200', async () => {
            const payload = this.payload.valid_person;
            const person = await Person.create(payload);
            const updated_payload = this.payload.updated_person;
            const res = await request(app).put(`/api/person/${person.person_id}/update`)
                .send(updated_payload)
                .set('Accept', 'application/json');
            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                __v: 0,
                _id: expect.any(String),
                person_id: expect.any(String),
                name: updated_payload.name,
                is_deleted: false,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            });
        });
    });


    describe('DELETE /:person_id/delete', () => {
        test('respond with 200', async () => {
            const payload = this.payload.valid_person;
            const person = await Person.create(payload);
            // create delete request
            const res = await request(app).delete(`/api/person/${person.person_id}/delete`)
                .set('Accept', 'application/json');
            expect(res.status).toBe(200);
            expect(res.body).toEqual(1)
        })
    })

    describe('DELETE /:person_id/delete', () => {
        test('respond with 404', async () => {
            // declare variable
            const person_payload = this.payload.deleted_person;
            const person = await Person.create(person_payload);

            // create delete request
            const res = await request(app).delete(`/api/person/${person.person_id}/delete`)
                .set('Accept', 'application/json');
            expect(res.status).toBe(404);
        })
    })


})