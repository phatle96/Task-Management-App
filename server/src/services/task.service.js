const mongoose = require('mongoose');
const Task = require('../models/task.model');
const Subtask = require('../models/subtask.model');

exports.find_task_query = async (req_param) => {
	try {
		const query = { ...req_param, is_deleted: false };
		const result = await Task.findOne(query).exec();
		return result;
	} catch (err) {
		return err;
	}
};

exports.create_task_query = async (req_body) => {
	const task = req_body;
	try {
		result = await Task.create(task);
		return result;
	} catch (err) {
		return err;
	}
};

exports.find_and_update_task_query = async (req_param, req_body) => {
	const query = { ...req_param, is_deleted: false };
	const task = req_body;
	const options = { new: true , timestamps: true};
	try {
		const result = await Task.findOneAndUpdate(query, task, options).exec();
		return result;
	} catch (err) {
		return err;
	}
};

exports.delete_task_query = async (req_param) => {
	try {
		// Find real task object id
		const task_object = await Task.findOne({ ...req_param, is_deleted: false }).exec();
		if (task_object == null || task_object.length == 0) {
			return task_object
		} else {
			// Set params
			const task_query = req_param;
			const ref_query = { task: task_object };
			const modify = { is_deleted: true, deleted_at: Date.now() };
			const options = { timestamps: false };

			// Update task task and subtask objects 
			const update_subtask_ref = await Subtask.updateMany(ref_query, modify, options).exec();
			const update_task = await Task.updateOne(task_query, modify, options).exec();

			// Then return number of document updated
			const total_updated =  update_subtask_ref.modifiedCount + update_task.modifiedCount;
			return total_updated;
		}
	} catch (err) {
		return err;
	}
};
