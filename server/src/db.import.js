#! /usr/bin/env node

// run following command line to populate data
// node ./src/db.import.js "mongodb://127.0.0.1:27017/dev"

console.log(
	'This script populates some data to your database.'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const List = require('./models/list.model');
const Person = require('./models/person.model');
const Task = require('./models/task.model');
const Subtask = require('./models/subtask.model');

const lists = [];
const people = [];
const tasks = [];
const subtasks = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));


async function main() {
	console.log("Debug: About to connect");
	await mongoose.connect(mongoDB);
	console.log("Debug: Should be connected?");
	await createLists();
	await createPeople();
	await createTasks();
	await createSubtasks();
	console.log("Debug: Closing mongoose");
	mongoose.connection.close();
}


async function listCreate(name,) {
	list_detail = {
		name: name,
	};
	const list = new List(list_detail);
	await list.save();
	lists.push(list);
	console.log(`Added list: ${name}`);
}

async function personCreate(name) {
	person_detail = { name: name };
	const person = new Person(person_detail);
	await person.save();
	people.push(person);
	console.log(`Added person: ${name}`);
}


async function taskCreate(content, list, person, alert, is_completed, is_deleted) {
	task_detail = {
		content: content,
		list: list,
	};
	if (person != false) task_detail.person = person;
	if (alert != false) task_detail.alert = alert;
	if (is_completed != false) task_detail.is_completed = is_completed;
	if (is_deleted != false) task_detail.is_deleted = is_deleted;

	const task = new Task(task_detail);
	await task.save();
	tasks.push(task);
	console.log(`Added task: ${content}`);
}

async function subtaskCreate(content, list, task, person, alert, is_completed, is_deleted) {
	subtask_detail = {
		content: content,
		list: list,
		task: task,
	};
	if (person != false) subtask_detail.person = person;
	if (alert != false) subtask_detail.alert = alert;
	if (is_completed != false) subtask_detail.is_completed = is_completed;
	if (is_deleted != false) subtask_detail.is_deleted = is_deleted;

	const subtask = new Subtask(subtask_detail);

	await subtask.save();
	subtasks.push(subtask);
	console.log(`Added subtask: ${content}`);
}

async function createLists() {
	console.log('Adding lists');
	await Promise.all([
		listCreate('my todo list'),
		listCreate('doing'),
		listCreate('another task'),
		listCreate('empty'),
	]);
}

async function createPeople() {
	console.log('Adding people');
	await Promise.all([
		personCreate('Phát'),
		personCreate('Tý'),
		personCreate('Thịnh'),
		personCreate('Khải'),
	]);
}

async function createTasks() {
	console.log('Adding tasks');
	await Promise.all([
		taskCreate('Create todo app', lists[0], people[0], '2023-04-01'),
		taskCreate('Deadline #1', lists[0], [people[1], people[2], people[3]], '2023-03-30'),
		taskCreate('Deadline #2', lists[0], [people[2], people[3]], '2023-04-29'),
		taskCreate('Learn Web Development', lists[1], [people[0], people[1], people[2], people[3]], '2023-05-01'),
		taskCreate('Learn Another Things', lists[1], people[0], false),
		taskCreate('Pay an Invoice', lists[2], people[0], false),
		taskCreate('Do exercise', lists[2], people[0], false),
	]);
}

async function createSubtasks() {
	console.log('Adding subtasks');
	await Promise.all([
		subtaskCreate('Design UI', lists[0], tasks[0], people[0], false),
		subtaskCreate('Create frontend', lists[0], tasks[0], false, false),
		subtaskCreate('Create backend', lists[0], tasks[0], [people[1], people[2], people[3]], false),
		subtaskCreate('test & deploy', lists[0], tasks[0], false, false),
		subtaskCreate('learn Nodejs', lists[1], tasks[3], [people[0], people[3]], false),
		subtaskCreate('learn reactjs', lists[1], tasks[3], false, false),
		subtaskCreate('learn expressjs', lists[1], tasks[3], false, false),
		subtaskCreate('learn mongodb', lists[1], tasks[3], [people[1], people[3]], false),
		subtaskCreate('learn authentication & authorization', lists[1], tasks[3], false, false)
	]);
}