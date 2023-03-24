const express = require("express");
const router = express.Router();

const subtask_controller = require('../controllers/subtask.controller');

//GET request for all subtask
router.get('/all', subtask_controller.subtasks);

//GET request for detail subtask
router.get('/:id', subtask_controller.get_subtask);

//POST request to create subtask
router.post('/create', subtask_controller.create_subtask);

//POST request to delete subtask
router.post('/:id/delete', subtask_controller.delete_subtask);

//POST request to update subtask
router.post('/:id/update', subtask_controller.update_subtask);

module.exports = router;