const express = require("express");
const router = express.Router();

const person_controller = require('../controllers/person.controller');

//GET request for all people
router.get('/all', person_controller.people);

//GET request for detail person
router.get('/:id', person_controller.get_person);

//POST request to create person
router.post('/create', person_controller.create_person);

//POST request to delete person
router.post('/:id/delete', person_controller.delete_person);

//POST request to update person
router.post('/:id/update', person_controller.update_person);

module.exports = router;