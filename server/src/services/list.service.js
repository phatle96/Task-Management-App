const mongoose = require('mongoose');
const List = require('../models/list.model');

exports.find_list_query = (req_param) => {
    const query = {list_id: `${req_param}`};
    return List.findOne(query).exec();
};

exports.create_list_query = (req_body) => {
    const list = {name: `${req_body.name}`};
    return  List.create(list);
};

exports.find_and_update_list_query = (req_param) => {
    return  List.findOneAndUpdate(req_param, req_body).exec();
};

exports.delete_list_query = (req_param) => {
    const query = {list_id: `${req_param}`};
    return  List.deleteOne(req_param).exec();
};