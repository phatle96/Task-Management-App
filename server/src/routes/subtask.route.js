const express = require("express");
const router = express.Router();

const { checkSchema } = require('express-validator');
const validator = require('../middleware/validator');

const subtask_handler = require('../controllers/subtask.controller');
const subtask_schema = require('../schema/subtask.schema');

//GET request for all subtask
router.get('/all',
	subtask_handler.subtasks);

//GET request for detail subtask
router.get('/:subtask_id',
	checkSchema(subtask_schema.get_subtask_schema), validator(),
	subtask_handler.get_subtask);

//POST request to create subtask
router.post('/create',
	checkSchema(subtask_schema.create_subtask_schema), validator(),
	subtask_handler.create_subtask);

//PUT request to update subtask
router.put('/:subtask_id/update',
	checkSchema(subtask_schema.update_subtask_schema), validator(),
	subtask_handler.update_subtask);

//DELETE request to delete subtask
router.delete('/:subtask_id/delete',
	checkSchema(subtask_schema.delete_subtask_schema), validator(),
	subtask_handler.delete_subtask);

module.exports = router;