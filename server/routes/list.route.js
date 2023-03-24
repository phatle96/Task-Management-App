const express = require("express");
const router = express.Router();

const validator = require('../middleware/validator');
const list_handler = require('../controllers/list.controller');
const list_schema = require('../schema/list.schema')

//GET request for all list
router.get(
	'/all',
	list_handler.lists);

//GET request for detail list
router.get(
	'/:id',
	validator(list_schema.get_list_schema),
	list_handler.get_list);

//POST request to create list
router.post(
	'/create',
	validator(list_schema.create_list_schema),
	list_handler.create_list);

//POST request to delete list
router.post(
	'/:id/delete',
	validator(list_schema.delete_list_schema),
	list_handler.delete_list);

//POST request to update list
router.put(
	'/:id/update',
	validator(list_schema.update_list_schema),
	list_handler.update_list);

module.exports = router;