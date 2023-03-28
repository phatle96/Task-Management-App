const mongoose = require('mongoose');
const Task = require('../models/task.model');

exports.find_task_query = (req_param) => {
    try {
        const query = req_param;
        return Task.findOne(query).exec();
    } catch (err) {
        return res.status(500).json({ 500: "Service Error" });
    }
};

exports.create_task_query = (req_body) => {
    try {
        const task = req_body;
        return Task.create(task);
    } catch (err) {
        return res.status(500).json({ 500: "Service Error" });
    }
};

exports.find_and_update_person_query = (req_param, req_body) => {
    try {
        return Subtask.findOneAndUpdate(req_param, req_body).exec();
    } catch (err) {
        return res.status(500).json({ 500: "Service Error" });
    }
};

exports.delete_person_query = (req_param) => {
    try {
        const query = req_param;
        return Task.deleteOne(query).exec();
    } catch (err) {
        res.status(500).json({ 500: "Service Error" });
    }
};