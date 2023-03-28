const mongoose = require('mongoose');
const Person = require('../models/person.model');

exports.find_person_query = (req_param) => {
    try {
        const query = req_param;
        return Person.findOne(query).exec();
    } catch (err) {
        return res.status(500).json({ 500: "Service Error" });
    }
};

exports.create_person_query = (req_body) => {
    try {
        const person = req_body;
        return Person.create(person);
    } catch (err) {
        return res.status(500).json({ 500: "Service Error" });
    }
};

exports.find_and_update_person_query = (req_param, req_body) => {
    try {
        return Person.findOneAndUpdate(req_param, req_body).exec();
    } catch (err) {
        return res.status(500).json({ 500: "Service Error" });
    }
};

exports.delete_person_query = (req_param) => {
    try {
        const query = req_param;
        return Person.deleteOne(query).exec();
    } catch (err) {
        res.status(500).json({ 500: "Service Error" });
    }
};