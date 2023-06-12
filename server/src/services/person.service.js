const Person = require('../models/person.model');
const Task = require('../models/task.model');
const Subtask = require('../models/subtask.model');

exports.find_all_people = async () => {
    const people = await Person.find({}).exec();
    return people;
}

exports.find_person_query = async (req_param) => {
    const query = { ...req_param, is_deleted: false };
    const result = await Person.findOne(query).exec();
    return result;
};

exports.create_person_query = async (req_body) => {
    const person = req_body;
    const result = await Person.create(person);
    return result;
};

exports.find_and_update_person_query = async (req_param, req_body) => {
    const query = { ...req_param, is_deleted: false };
    const person = req_body;
    const options = { new: true, timestamps: true };
    const result = await Person.findOneAndUpdate(query, person, options).exec();
    return result;
};

exports.delete_person_query = async (req_param) => {
    // Find real person object id
    const person_object = await Person.findOne({ ...req_param, is_deleted: false }).exec();
    if (person_object == null || person_object.length == 0) {
        return person_object;
    } else {
        const query = req_param;
        const modify = { is_deleted: true, deleted_at: Date.now() };
        const options = { timestamps: false };

        const update_person = await Person.updateOne(query, modify, options).exec();
        const total_updated = update_person.modifiedCount;
        return total_updated;
    }
};