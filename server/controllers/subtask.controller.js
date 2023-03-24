const Subtask =   require('../models/subtask.model');

//View all subtask on GET
exports.subtasks = (req, res) => {
    res.send('NOT IMPLEMENTED: view subtasks')
}

//View detail subtask on GET
exports.get_subtask = (req, res) => {
    res.send('NOT IMPLEMENTED: view subtask detail ${req.params.id}')
}

//Create subtask on POST
exports.create_subtask = (req, res) => {
    res.send('NOT IMPLEMENTED: create subtask')
}

//Delete subtask on POST
exports.delete_subtask = (req, res) => {
    res.send('NOT IMPLEMENTED: delete subtask')
}

//Update subtask on POST
exports.update_subtask = (req, res) => {
    res.send('NOT IMPLEMENTED: update subtask')
}