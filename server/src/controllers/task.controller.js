const Task = require('../models/task.model');
const { matchedData } = require('express-validator');
const {
	find_task_query,
	find_and_update_task_query,
	delete_task_query,
	create_task_query } = require('../services/task.service');

//View all task on GET
exports.tasks = async (req, res, next) => {
	try {
		const tasks = await Task.find({})
			.sort({ date_created: 1 })
			.exec();
		if (!tasks.length == 0) {
			return res.status(200).json(tasks);
		} else {
			return res.status(404).json({ 404: "Not Found" });
		}
	} catch (err) {
		return res.status(500).json({ 500: 'Controller Error' });
	}
};

// View detail task on GET
exports.get_task = async (req, res, next) => {
	try {
		const req_param = matchedData(req, { locations: ['params'] })
		const task = await find_task_query(req_param);
		if (task == null || task.length == 0) {
			return res.status(404).json({ 404: 'Not found' });
		} else {
			return res.status(200).json(task);
		}
	} catch (err) {
		return res.status(500).json({ 500: 'Controller Error' });
	}
};

// Create task on POST
exports.create_task = async (req, res, next) => {
	try {
		const req_body = matchedData(req, { locations: ['body'] });
		const task = await create_task_query(req_body);
		return res.status(200).json(task);
	} catch (err) {
		return res.status(500).json({ 500: "Controller Error" });
	}
};

//Update task on POST
exports.update_task = async (req, res, next) => {
	try {
		const req_param = matchedData(req, { locations: ['params'] });
		const req_body = matchedData(req, { locations: ['body'] });
		const task = await find_and_update_task_query(req_param, req_body);
		return res.status(200).json(task);
	} catch (err) {
		return res.status(500).json({ 500: "Controller Error" });
	}
};

// Delete task on DELETE
exports.delete_task = async (req, res, next) => {
	try {
		const req_param = matchedData(req, { locations: ['params'] });
		const task = await delete_task_query(req_param);
		if (task == null || task.length == 0) {
			return res.status(404).json({ 404: "Not found" });
		} else {
			return res.status(200).json(task);
		}
	} catch (err) {
		return res.status(500).json({ 500: "Controller Error" });
	}
};