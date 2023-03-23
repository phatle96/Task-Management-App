const Task =   require('../models/task.model');

//View all task on GET
exports.tasks = (req, res) => {
    res.send('NOT IMPLEMENTED: view tasks')
}

//View detail task on GET
exports.get_task = (req, res) => {
    res.send('NOT IMPLEMENTED: view task detail ${req.params.id}')
}

//Create task on POST
exports.create_task = (req, res) => {
    res.send('NOT IMPLEMENTED: create task')
}

//Delete task on POST
exports.delete_task = (req, res) => {
    res.send('NOT IMPLEMENTED: delete task')
}

//Update task on POST
exports.update_task = (req, res) => {
    res.send('NOT IMPLEMENTED: update task')
}