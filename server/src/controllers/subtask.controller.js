const Subtask = require('../models/subtask.model');
const { matchedData } = require('express-validator');
const {
	
	find_subtask_query,
	find_and_update_subtask_query,
	delete_subtask_query,
	create_subtask_query } = require('../services/subtask.service');

//View all subtask on GET
exports.subtasks = async (req, res, next) => {
	try {
		const subtasks = await Subtask.find({})
			.sort({ date_created: 1 })
			.exec();
		if (!subtasks.length == 0) {
			return res.status(200).json(subtasks);
		} else {
			return res.status(404).json({ 404: "Not Found" });
		}
	} catch (err) {
		return res.status(500).json({ 500: 'Controller Error' });
	}
};

// View detail subtask on GET
exports.get_subtask = async (req, res, next) => {
	try {
		const req_param = matchedData(req, { locations: ['params'] })
		const subtask = await find_subtask_query(req_param);
		if (subtask == null || subtask.length == 0) {
			return res.status(404).json({ 404: 'Not found' });
		} else {
			return res.status(200).json(subtask);
		}
	} catch (err) {
		return res.status(500).json({ 500: 'Controller Error' });
	}
};

// Create subtask on POST
exports.create_subtask = async (req, res, next) => {
	try {
		const req_body = matchedData(req, { locations: ['body'] });
		const subtask = await create_subtask_query(req_body);
		return res.status(200).json(subtask);
	} catch (err) {
		return res.status(500).json({ 500: "Controller Error" });
	}
};

//Update subtask on POST
exports.update_subtask = async (req, res, next) => {
	try {
		const req_param = matchedData(req, { locations: ['params'] });
		const req_body = matchedData(req, { locations: ['body'] });
		const subtask = await find_and_update_subtask_query(req_param, req_body);
		return res.status(200).json(subtask);
	} catch (err) {
		return res.status(500).json({ 500: "Controller Error" });
	}
};

// Delete subtask on DELETE
exports.delete_subtask = async (req, res, next) => {
	try {
		const req_param = matchedData(req, { locations: ['params'] });
		const subtask = await delete_subtask_query(req_param);
		if (subtask == null || subtask.length == 0) {
			return res.status(404).json({ 404: "Not found" });
		} else {
			return res.status(200).json(subtask);
		}
	} catch (err) {
		return res.status(500).json({ 500: "Controller Error" });
	}
};