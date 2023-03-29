const mongoose = require('mongoose');
const List = require('../models/list.model');
const Task = require('../models/task.model');
const Subtask = require('../models/subtask.model');

exports.find_list_query = async (req_param) => {
	try {
		const query = { ...req_param, is_deleted: false };
		const result = await List.findOne(query).exec();
		return result;
	} catch (err) {
		return err;
	}
};

exports.create_list_query = async (req_body) => {
	const list = req_body;
	try {
		result = await List.create(list);
		return result;
	} catch (err) {
		return err;
	}
};

exports.find_and_update_list_query = async (req_param, req_body) => {
	const query = { ...req_param, is_deleted: false };
	const list = req_body;
	const options = { new: true , timestamps: true};
	try {
		const result = await List.findOneAndUpdate(query, list, options).exec();
		return result;
	} catch (err) {
		return err;
	}
};

exports.delete_list_query = async (req_param) => {
	try {
		// Find real list object id
		const list_object = await List.findOne({ ...req_param, is_deleted: false }).exec();
		if (list_object == null || list_object.length == 0) {
			return list_object
		} else {
			// Set params
			const list_query = req_param;
			const ref_query = { list: list_object };
			const modify = { is_deleted: true, deleted_at: Date.now() };
			const options = { timestamps: false };

			// Update list task and subtask objects 
			const update_task_ref = await Task.updateMany(ref_query, modify, options).exec();
			const update_subtask_ref = await Subtask.updateMany(ref_query, modify, options).exec();
			const update_list = await List.updateOne(list_query, modify, options).exec();

			// Then return number of document updated
			const total_updated = update_task_ref.modifiedCount + update_subtask_ref.modifiedCount + update_list.modifiedCount;
			return total_updated;
		}
	} catch (err) {
		return err;
	}
};
