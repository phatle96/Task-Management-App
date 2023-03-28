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
        return res.status(500).json({ 500: "Service Error" });
    }
};

exports.create_list_query = async (req_body) => {
    const list = req_body;
    try {
        result = await List.create(list);
        return result;
    } catch (err) {
        return res.status(500).json({ 500: "Service Error" });
    }
};

exports.find_and_update_list_query = async (req_param, req_body) => {
    const query = { ...req_param, is_deleted: false };
    const list = req_body;
    const options = { new: true };
    try {
        const result = await List.findOneAndUpdate(query, list, options).exec();
        return result;
    } catch (err) {
        return res.status(500).json({ 500: "Service Error" });
    }
};

exports.delete_list_query = async (req_param) => {
    try {
        const query = req_param;
        const options = { timestamps: true }

        // Find real list object id
        const list_object_id = await List.find({ ...req_param, is_deleted: false }).exec();

        // Update list task and subtask objects 
        const update_task_ref = await Task.updateMany({ list: list_object_id }, { is_deleted: true }, options).exec();
        const update_subtask_ref = await Subtask.updateMany({ list: list_object_id }, { is_deleted: true }, options).exec();
        const update_list = await List.updateOne(req_param, { is_deleted: true }, options).exec();

        // Then return number of document updated
        const total_updated = await update_task_ref.modifiedCount + update_subtask_ref.modifiedCount + update_list.modifiedCount;
        return total_updated;
    } catch (err) {
        res.status(500).json({ 500: "Service Error" });
    }
};