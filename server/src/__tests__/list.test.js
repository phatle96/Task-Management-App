require('dotenv').config();
const request = require("supertest");
const createServer = require("../utils/app");
const List = require("../models/list.model");
const Task = require("../models/task.model");
const Subtask = require("../models/subtask.model");
const mongoose = require('mongoose');

const app = createServer();
const mongoDB = process.env.MONGODB_URL;

exports.payload = {
	error_list: {
		list_id: "",
		name: "an error payload",
	},
	valid_list: {
		name: "a valid payload",
	},
	updated_list: {
		name: "an updated payload",
	},
	valid_task: {
		content: "a valid task",
		is_completed: false,
		is_deleted: false,
	},
	valid_subtask: {
		content: "a valid subtask",
		is_completed: false,
		is_deleted: false
	},
};

describe('List API testing', () => {

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

	// Get list route
	describe('GET /list/all', () => {
		test("respond with 404", async () => {
			const res = await request(app).get('/api/list/all')
				.set('Accept', 'application/json');
			expect(res.status).toBe(404);
		});
	});

	describe('GET /list/all', () => {
		test("respond with 200", async () => {
			const payload = this.payload.valid_list;
			const list = await List.create(payload);
			const res = await request(app).get('/api/list/all')
				.set('Accept', 'application/json');
			expect(res.status).toBe(200);
		});
	});

	describe('GET /list/:list_id', () => {
		test("respond with 404", async () => {
			const list_id = 'list_1234';
			const res = await request(app).get(`/api/list/${list_id}`)
				.set('Accept', 'application/json');
			expect(res.status).toBe(404);
		});
		test("respond with 200", async () => {
			const payload = this.payload.valid_list;
			const list = await List.create(payload);
			const res = await request(app).get(`/api/list/${list.list_id}`)
				.set('Accept', 'application/json');
			expect(res.status).toBe(200);
			expect(res.body.list_id).toBe(list.list_id);
		});
	});

	describe('POST /list/create', () => {
		test("respond with 200", async () => {
			const payload = this.payload.valid_list;
			const res = await request(app).post('/api/list/create')
				.send(payload)
				.set('Accept', 'application/json');
			//console.log(res.body)
			expect(res.status).toBe(200);
			expect(res.body).toEqual({
				__v: 0,
				_id: expect.any(String),
				list_id: expect.any(String),
				name: payload.name,
				is_deleted: false,
				createdAt: expect.any(String),
				updatedAt: expect.any(String),
			});
		});
	});

	describe('PUT /list/:id/update', () => {
		test('response with 200', async () => {
			const payload = this.payload.valid_list;
			const list = await List.create(payload);
			const updated_payload = this.payload.updated_list;
			const res = await request(app).put(`/api/list/${list.list_id}/update`)
				.send(updated_payload)
				.set('Accept', 'application/json');
			expect(res.status).toBe(200);
			expect(res.body).toEqual({
				__v: 0,
				_id: expect.any(String),
				list_id: expect.any(String),
				name: updated_payload.name,
				is_deleted: false,
				createdAt: expect.any(String),
				updatedAt: expect.any(String),
			});
		});
	});

	describe('DELETE /:list_id/delete', () => {
		test('respond with 200', async () => {
			// declare variable
			const list_payload = this.payload.valid_list;
			const task_payload = this.payload.valid_task;
			const subtask_payload = this.payload.valid_subtask;

			// create some test list, task, subtask
			const list = await List.create(list_payload);
			const task = await Task.create({ ...task_payload, list: list });
			const task_2 = await Task.create({ ...task_payload, list: list });
			const subtask = await Subtask.create({ ...subtask_payload, list: list._id, task: task._id });

			// create delete request
			const res = await request(app).delete(`/api/list/${list.list_id}/delete`)
				.set('Accept', 'application/json');
				expect(res.status).toBe(200);
				expect(res.body).toEqual(4)
		})
	})


})