const express = require("express");
const router = express.Router();

const list_controller = require('../controllers/list.controller');

//GET request for all list
router.get('/all', list_controller.lists);

//GET request for detail list
router.get('/:id', list_controller.get_list);

//POST request to create list
router.post('/create', list_controller.create_list);

//POST request to delete list
router.post('/:id/delete', list_controller.delete_list);

//POST request to update list
router.post('/:id/update', list_controller.update_list);

module.exports = router;