const Task = require('../models/task.model');
const { matchedData } = require('express-validator');
const {
	find_all_tasks,
	find_task_query,
	find_subtask_query,
	find_and_update_task_query,
	delete_task_query,
	create_task_query } = require('../services/task.service');

//View all task on GET
exports.tasks = async (req, res, next) => {
	try {
		const tasks = await find_all_tasks();
		if (tasks.length == 0 || tasks == null) {
			return res.status(404).json({ 404: "Not Found" });
		} else {
			return res.status(200).json(tasks);
		}
	} catch (err) {
		return res.status(500).json(`err: ${err}`);
	}
};

// View detail task on GET
exports.get_task = async (req, res, next) => {
	try {
		const req_param = req.params;
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


exports.get_subtask = async (req, res, next) => {
	try {
		const req_param = req.params;
		const subtasks = await find_subtask_query(req_param);
		if (subtasks == null || subtasks.length == 0) {
			return res.status(404).json({ 404: 'Not found' });
		} else {
			return res.status(200).json(subtasks);
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
		return res.status(500).json({ 500: err });
	}
};

//Update task on POST
exports.update_task = async (req, res, next) => {
	try {
		const req_param = req.params;
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
		const req_param = req.params;
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