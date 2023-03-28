const mongoose = require('mongoose');
const Subtask = require('../models/subtask.model');

exports.find_subtask_query = (req_param) => {
    try {
        const query = req_param;
        return Subtask.findOne(query).exec();
    } catch (err) {
        return res.status(500).json({ 500: "Service Error" });
    }
};

exports.create_subtask_query = (req_body) => {
    try {
        const subtask = req_body;
        return Subtask.create(subtask);
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

exports.delete_person_query = async (req_param) => {
    try {
        const query = req_param ;
        return Subtask.deleteOne(query).exec();
    } catch (err) {
        res.status(500).json({ 500: "Service Error" });
    }
};