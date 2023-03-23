const express = require("express");
const router = express.Router();

const task_controller = require('../controllers/task.controller');

//GET request for all task
router.get('/all', task_controller.tasks);

//GET request for detail task
router.get('/:id', task_controller.get_task);

//POST request to create task
router.post('/create', task_controller.create_task);

//POST request to delete task
router.post('/:id/delete', task_controller.delete_task);

//POST request to update task
router.post('/:id/update', task_controller.update_task);

module.exports = router;