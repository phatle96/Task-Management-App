const List = require('../models/list.model');
const { matchedData } = require('express-validator');
const {
	find_list_query,
	find_and_update_list_query,
	delete_list_query,
	create_list_query } = require('../services/list.service');

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
		return res.status(500).json({ 500: 'Controller Error' });
	}
};

// View detail list on GET
exports.get_list = async (req, res, next) => {
	try {
		const req_param = matchedData(req, { locations: ['params'] })
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