const express = require("express");
const router = express.Router();

const { checkSchema } = require('express-validator');
const validator = require('../middleware/validator');

const person_handler = require('../controllers/person.controller');
const person_schema = require('../schema/person.schema');

const cache = require('../middleware/route.cache')


//GET request for all people
router.get('/all',
	person_handler.people);

//GET request for detail person
router.get('/:person_id',
	checkSchema(person_schema.get_person_schema), validator(),
	person_handler.get_person);

//POST request to create person
router.post('/create',
	checkSchema(person_schema.create_person_schema), validator(),
	person_handler.create_person);

//PUT request to update person
router.put('/:person_id/update',
	checkSchema(person_schema.update_person_schema), validator(),
	person_handler.update_person);

//DELETE request to delete person
router.delete('/:person_id/delete',
	checkSchema(person_schema.delete_person_schema), validator(),
	person_handler.delete_person);

module.exports = router;