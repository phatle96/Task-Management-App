const express = require("express");
const router = express.Router();

const { checkSchema } = require('express-validator');
const validator = require('../middleware/validator');

const task_handler = require('../controllers/task.controller');
const task_schema = require('../schema/task.schema');


//GET request for all task
router.get('/all', task_handler.tasks);

//GET request for detail task
router.get('/:task_id',
	checkSchema(task_schema.get_task_schema), validator(),
	task_handler.get_task);

router.get('/:task_id/subtask',
	checkSchema(task_schema.get_task_schema), validator(),
	task_handler.get_subtask)

//POST request to create task
router.post('/create',
	checkSchema(task_schema.create_task_schema), validator(),
	task_handler.create_task);

//PUT request to update task
router.put('/:task_id/update',
	checkSchema(task_schema.update_task_schema), validator(),
	task_handler.update_task);

//PUT request to unset field of task
router.put('/:task_id/update/unset',
	checkSchema(task_schema.update_task_schema), validator(),
	task_handler.unset_task);

//DELETE request to delete task
router.delete('/:task_id/delete',
	checkSchema(task_schema.delete_task_schema), validator(),
	task_handler.delete_task);

module.exports = router;