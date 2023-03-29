const mongoose = require('mongoose');
require('dotenv').config();
const request = require("supertest");
const createServer = require("../utils/app");
const List = require("../models/list.model");
const Task = require("../models/task.model");
const Subtask = require("../models/subtask.model");
const payload = require('./example.payload');
const app = createServer();
const mongoDB = process.env.MONGODB_URL;

exports.payload = {
    valid_list: {
        name: 'a valid list',
    },
    error_list: {
        list_id: 'error_id',
        name: 'a error list'
    },
    updated_list: {
        name: 'an updated list',
    },
    deleted_list: {
        name: 'a deleted list',
        is_deleted: true,
    },
    valid_task: {
        content: 'a valid task',
    },
    error_task: {
        task_id: '123',
        content: 'an error task',
    },
    deleted_task: {
        content: 'a deleted task',
        is_deleted: true
    },
    updated_task: {
        content: 'a updated task',
    },
    valid_subtask: {
        content: 'a valid subtask',
    },
    error_subtask: {
        subtask_id: 'error_id',
        content: 'an error subtask',
    },
    updated_subtask: {
        content: 'an updated subtask',
    },
    deleted_subtask: {
        content: 'a deleted subtask',
        is_deleted: true,
    },
    valid_person: {
        name: 'a valid person',
    },
    error_person: {
        person_id: 'error_id',
        name: 'an error person',
    },
    updated_person: {
        name: 'an updated person',
    },
    deleted_person: {
        name: 'a deleted person',
        is_deleted: true,
    }
};

describe('Subtask API testing', () => {

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

    // Get task route
    describe('GET /task/:task_id', () => {
        test("respond with 404", async () => {
            const subtask_id = 'subtask_1234';
            const res = await request(app).get(`/api/subtask/${subtask_id}`)
                .set('Accept', 'application/json');
            expect(res.status).toBe(404);
        });

        test("respond with 200", async () => {
            const list_payload = this.payload.valid_list;
            const task_payload = this.payload.valid_task;
            const subtask_payload = this.payload.valid_subtask;
            const list = await List.create(list_payload);
            const task = await Task.create({ ...task_payload, list: list });
            const subtask = await Subtask.create({ ...subtask_payload, list: list, task: task });
            const res = await request(app).get(`/api/subtask/${subtask.subtask_id}`)
                .set('Accept', 'application/json');
            expect(res.status).toBe(200);
            expect(res.body.subtask_id).toBe(subtask.subtask_id);
        });
    });

    describe('POST /subtask/create', () => {
        test("respond with 200", async () => {
            const list_payload = this.payload.valid_list;
            const list = await List.create(list_payload);
            const task_payload = { ...this.payload.valid_task, list: list._id };
            const task = await Task.create(task_payload);
            const subtask_payload = { ...this.payload.valid_subtask, list: list._id, task: task._id };
            const res = await request(app).post('/api/subtask/create')
                .send(subtask_payload)
                .set('Accept', 'application/json');
            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                __v: 0,
                _id: expect.any(String),
                subtask_id: expect.any(String),
                list: expect.any(String),
                task: expect.any(String),
                person: [],
                content: subtask_payload.content,
                is_completed: false,
                is_deleted: false,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            });
        });
    });

    describe('POST /subtask/create', () => {
        test("respond with 400", async () => {
            const payload = this.payload.error_subtask;
            const res = await request(app).post('/api/subtask/create')
                .send(payload)
                .set('Accept', 'application/json');
            expect(res.status).toBe(400);
        });
    });

    describe('PUT /subtask/:id/update', () => {
        test('response with 200', async () => {
            const list_payload = payload.valid_list;
            const list = await List.create(list_payload);
            const task_payload = { ...this.payload.valid_task, list: list };
            const task = await Task.create(task_payload);
            const subtask_payload = { ...this.payload.valid_subtask, list: list, task: task };
            const subtask = await Subtask.create(subtask_payload);
            const updated_subtask_payload = { ...payload.updated_task, list: list._id, task: task._id };
            const res = await request(app).put(`/api/subtask/${subtask.subtask_id}/update`)
                .send(updated_subtask_payload)
                .set('Accept', 'application/json');
            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                __v: 0,
                _id: expect.any(String),
                subtask_id: expect.any(String),
                list: expect.any(String),
                task: expect.any(String),
                person: [],
                is_completed: false,
                content: updated_subtask_payload.content,
                is_deleted: false,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            });
        });
    });

    describe('DELETE /:subtask_id/delete', () => {
        test('respond with 200', async () => {
            const list_payload = payload.valid_list;
            const list = await List.create(list_payload);
            const task_payload = { ...payload.valid_task, list: list };
            const task = await Task.create(task_payload);
            const subtask_payload = { ...payload.valid_subtask, list: list, task: task };
            const subtask = await Subtask.create(subtask_payload);

            const res = await request(app).delete(`/api/subtask/${subtask.subtask_id}/delete`)
                .set('Accept', 'application/json');
            expect(res.status).toBe(200);
            expect(res.body).toEqual(1)
        })
    })

    describe('DELETE /:subtask_id/delete', () => {
        test('respond with 404', async () => {
            // declare variable
            const list_payload = payload.valid_list;
            const list = await List.create(list_payload);
            const task_payload = { ...payload.valid_task, list: list };
            const task = await Task.create(task_payload);
            const subtask_payload = { ...payload.deleted_subtask, list: list, task: task };
            const subtask = await Subtask.create(subtask_payload);

            // create delete request
            const res = await request(app).delete(`/api/subtask/${subtask.subtask_id}/delete`)
                .set('Accept', 'application/json');
            expect(res.status).toBe(404);
        })
    })
})