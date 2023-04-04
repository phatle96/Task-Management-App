const List = require('../models/list.model');
const { matchedData } = require('express-validator');
const {
	find_all_list,
	find_list_query,
	find_list_task_query,
	find_list_subtask_query,
	create_list_query,
	find_and_update_list_query,
	delete_list_query } = require('../services/list.service');

//View all list on GET
exports.lists = async (req, res, next) => {
	try {
		const lists = await find_all_list();
		if (lists.length == 0 || lists == null) {
			return res.status(404).json({ 404: "Not Found" });
		} else {
			return res.status(200).json(lists);
		}
	} catch (err) {
		return res.status(500).json({ 500: 'Controller Error' });
	}
};

// View detail list on GET
exports.get_list = async (req, res, next) => {
	try {
		const req_param = matchedData(req, { locations: ['params'] });
		const list = await find_list_query(req_param);
		if (list == null || list.length == 0) {
			return res.status(404).json({ 404: 'Not found' });
		} else {
			return res.status(200).json(list);
		}
	} catch (err) {
		return res.status(500).json({ 500: 'Controller Error' });
	}
};

//
exports.get_list_task = async (req, res, next) => {
	try {
		const req_param = matchedData(req, { locations: ['params'] });
		const tasks = await find_list_task_query(req_param);
		if (tasks == null || tasks.length == 0) {
			return res.status(404).json({ 404: "Not Found" });
		} else {
			return res.status(200).json(tasks);
		}
	} catch (err) {
		return res.status(500).json({ 500: 'Controller Error' });
	}
}

//
exports.get_list_subtask = async (req, res, next) => {
	try {
		const req_param = matchedData(req, { locations: ['params'] });
		const subtasks = await find_list_subtask_query(req_param);
		if (subtasks == null || subtasks.length == 0) {
			return res.status(404).json({ 404: "Not Found" });
		} else {
			return res.status(200).json(subtasks);
		}
	} catch (err) {
		return res.status(500).json({ 500: 'Controller Error' });
	}
}

// Create list on POST
exports.create_list = async (req, res, next) => {
	try {
		const req_body = matchedData(req, { locations: ['body'] });
		const list = await create_list_query(req_body);
		return res.status(200).json(list);
	} catch (err) {
		return res.status(500).json({ 500: "Controller Error" });
	}
};

//Update list on POST
exports.update_list = async (req, res, next) => {
	try {
		const req_param = matchedData(req, { locations: ['params'] });
		const req_body = matchedData(req, { locations: ['body'] });
		const list = await find_and_update_list_query(req_param, req_body);
		return res.status(200).json(list);
	} catch (err) {
		return res.status(500).json({ 500: "Controller Error" });
	}
};

// Delete list on DELETE
exports.delete_list = async (req, res, next) => {
	try {
		const req_param = matchedData(req, { locations: ['params'] });
		const list = await delete_list_query(req_param);
		if (list == null || list.length == 0) {
			return res.status(404).json({ 404: "Not found" });
		} else {
			return res.status(200).json(list);
		}
	} catch (err) {
		return res.status(500).json({ 500: "Controller Error" });
	}
};