const express = require("express");
const router = express.Router();
const {checkSchema} = require('express-validator')

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
	checkSchema(list_schema.get_list_schema), validator(),
	list_handler.get_list);

//POST request to create list
router.post(
	'/create',
	checkSchema(list_schema.create_list_schema), validator(),
	list_handler.create_list);

//POST request to delete list
router.delete(
	'/:id/delete',
	checkSchema(list_schema.delete_list_schema), validator(),
	list_handler.delete_list);

//POST request to update list
router.put(
	'/:id/update',
	checkSchema(list_schema.update_list_schema), validator(),
	list_handler.update_list);

module.exports = router;