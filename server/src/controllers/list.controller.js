const List = require('../models/list.model');
const Task = require('../models/task.model');
const Subtask = require('../models/subtask.model');
const Person = require('../models/person.model')
const { body, validationResult } = require('express-validator');
const {
	find_list_query,
	find_and_update_list_query,
	delete_list_query,
	create_list_query } = require('../services/list.service');
const listModel = require('../models/list.model');

//View all list on GET
exports.lists = async (req, res, next) => {
	try {
		const lists = await List.find({})
			.sort({ date_created: 1 })
			.exec();
		if (!lists.length == 0) {
			return res.status(200).json(lists);
		} else {
			return res.status(404).json({ 404: "Not Found" });
		}
	} catch (err) {
		return res.status(403).json({ 403: 'Request handler error' });
	}
}

// View detail list on GET
exports.get_list = async (req, res, next) => {
	const req_param = req.params.id;
	try {
		const list = await find_list_query(req_param);
		if (list == null || list.length == 0 ) {
			return res.status(404).json({ 404: 'Not found' });
		} else {
			return res.status(200).json(list);
		}
	} catch (err) {
		return res.status(403).json({ 403: 'Request handler error' });
	}
}

// Create list on POST
exports.create_list = async (req, res, next) => {
	const req_body = req.body;
	try {
		const list = await create_list_query(req_body);
		return res.status(200).json(list);
	} catch (err) {
		return res.status(403).send({ 403: "Request handler error" });
	}
}

// Delete list on POST
// 
exports.delete_list = (req, res, next) => {
	const req_param = req.params.id;
	try {
		const list = delete_list_query(req_param);
		return res.status(200).json(list);
	} catch (err) {
		return res.status(403).send({ 403: "Request handler error" });
	}

}

//Update list on POST
exports.update_list = (req, res) => {
	res.send('NOT IMPLEMENTED: update list')
}
