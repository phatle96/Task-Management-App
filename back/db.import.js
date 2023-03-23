#! /usr/bin/env node

// run following command line to populate data
// node db.import.js "mongodb://127.0.0.1:27017/dev"

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


async function listCreate(name, date_created,) {
	list_detail = {
		name: name,
		date_created: date_created
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


async function taskCreate(content, date_created, updated, list, person, alert) {
	task_detail = {
		content: content,
		date_created: date_created,
		list: list,
	};
	if (updated != false) task_detail.updated = updated;
	if (person != false) task_detail.person = person;
	if (alert != false) task_detail.alert = alert;

	const task = new Task(task_detail);
	await task.save();
	tasks.push(task);
	console.log(`Added task: ${content}`);
}

async function subtaskCreate(content, date_created, updated, list, task, person, alert) {
	subtask_detail = {
		content: content,
		date_created: date_created,
		list: list,
		task: task,
	};
	if (updated != false) subtask_detail.updated = updated;
	if (person != false) subtask_detail.person = person;
	if (alert != false) subtask_detail.alert = alert;

	const subtask = new Subtask(subtask_detail);
	
	await subtask.save();
	subtasks.push(subtask);
	console.log(`Added subtask: ${content}`);
}

async function createLists() {
	console.log('Adding lists');
	await Promise.all([
		listCreate('my todo list', '2023-01-01'),
		listCreate('doing', '2023-01-02'),
		listCreate('another task', '2023-02-02'),
		listCreate('empty', '2023-03-10'),
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
		taskCreate('Create todo app', '2023-03-01', false, lists[0], people[0], '2023-04-01'),
		taskCreate('Deadline #1', '2023-03-08', false, lists[0], people[1], '2023-03-30'),
		taskCreate('Deadline #2', '2023-03-20', false, lists[0], people[2], '2023-04-29'),
		taskCreate('Learn Web Development', '2023-03-20', false, lists[1], people[0], '2023-05-01'),
		taskCreate('Learn Another Things', '2023-03-21', false, lists[1], people[0], false),
		taskCreate('Pay an Invoice', '2023-03-01', false, lists[2], people[0], false),
		taskCreate('Do exercise', '2023-03-01', false, lists[2], people[0], false),
	]);
}

async function createSubtasks(){
	console.log('Adding subtasks');
	await Promise.all([
		subtaskCreate('Design UI', '2023-03-01', false, lists[0], tasks[0], people[0], false),
		subtaskCreate('Create frontend', '2023-03-01', false, lists[0], tasks[0], false, false),
		subtaskCreate('Create backend', '2023-03-01', false, lists[0], tasks[0], false, false),
		subtaskCreate('test & deploy', '2023-03-01', false, lists[0], tasks[0], false, false),
		subtaskCreate('learn Nodejs', '2023-03-20', false, lists[1], tasks[3], false, false),
		subtaskCreate('learn reactjs', '2023-03-20', false, lists[1], tasks[3], false, false),
		subtaskCreate('learn expressjs', '2023-03-20', false, lists[1], tasks[3], false, false),
		subtaskCreate('learn mongodb', '2023-03-20', false, lists[1], tasks[3], false, false),
		subtaskCreate('learn authentication & authorization', '2023-03-20', false, lists[1], tasks[3], false, false)
	]);
}