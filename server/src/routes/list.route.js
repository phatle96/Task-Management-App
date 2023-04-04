const express = require("express");
const router = express.Router();

const { checkSchema } = require('express-validator');
const validator = require('../middleware/validator');

const list_handler = require('../controllers/list.controller');
const list_schema = require('../schema/list.schema');

const cache = require('../middleware/route.cache')

//GET request for all list
router.get(
	'/all',
	cache(300),
	list_handler.lists);

// GET request for detail list
router.get(
	'/:list_id',
	cache(300),
	checkSchema(list_schema.get_list_schema), validator(),
	list_handler.get_list);

// GET request for task list
router.get(
	'/:list_id/task',
	checkSchema(list_schema.get_list_schema), validator(),
	list_handler.get_list_task);

// GET request for subtask list
router.get(
	'/:list_id/subtask',
	checkSchema(list_schema.get_list_schema), validator(),
	list_handler.get_list_subtask);

// POST request to create list
router.post(
	'/create',
	checkSchema(list_schema.create_list_schema), validator(),
	list_handler.create_list);

// PUT request to update list
router.put(
	'/:list_id/update',
	checkSchema(list_schema.update_list_schema), validator(),
	list_handler.update_list);

// DELETE request to delete list
router.delete(
	'/:list_id/delete',
	checkSchema(list_schema.delete_list_schema), validator(),
	list_handler.delete_list);

module.exports = router;