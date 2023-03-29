const mongoose = require('mongoose');
const Subtask = require('../models/subtask.model');

exports.find_subtask_query = async (req_param) => {
	try {
		const query = { ...req_param, is_deleted: false };
		const result = await Subtask.findOne(query).exec();
		return result;
	} catch (err) {
		return err;
	}
};

exports.create_subtask_query = async (req_body) => {
	const subtask = req_body;
	try {
		result = await Subtask.create(subtask);
		return result;
	} catch (err) {
		return err;
	}
};

exports.find_and_update_subtask_query = async (req_param, req_body) => {
	const query = { ...req_param, is_deleted: false };
	const subtask = req_body;
	const options = { new: true , timestamps: true};
	try {
		const result = await Subtask.findOneAndUpdate(query, subtask, options).exec();
		return result;
	} catch (err) {
		return err;
	}
};

exports.delete_subtask_query = async (req_param) => {
	try {
		// Find real subtask object id
        const query = { ...req_param, is_deleted: false };
		const subtask_object = await Subtask.findOne(query).exec();
		if (subtask_object == null || subtask_object.length == 0) {
			return subtask_object
		} else {
			// Set params
			const modify = { is_deleted: true, deleted_at: Date.now() };
			const options = { timestamps: false };
			const update_subtask = await Subtask.updateOne(query, modify, options).exec();

			const total_updated = update_subtask.modifiedCount;
			return total_updated;
		}
	} catch (err) {
		return err;
	}
};
