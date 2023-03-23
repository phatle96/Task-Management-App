const List = require('../models/list.model');
const Task = require('../models/task.model');
const Subtask = require('../models/subtask.model');
const Person = require('../models/person.model')
const { body, validationResult } = require('express-validator');

//View all list on GET
exports.lists = async (req, res, next) => {
	try {
		const lists = await List.find({}, 'name date_created ')
			.sort({ date_created: 1 })
			.exec();
		return res.status(200).json(lists);
	} catch (err) {
		return res.status(404).json({ error: 'List Not Found' });
	}
}

// View detail list on GET
exports.get_list = async (req, res, next) => {
	try {
		const list = await List.findById(req.params.id)
			.exec();
		const tasks = await Task.find({ list: req.params.id })
			.populate('person')
			.exec()
		const subtasks = await Subtask.find({ list: req.params.id })
			.populate('person')
			.exec()
		// send response
		return res.status(200).json({
			list: list,
			tasks: tasks,
			subtasks: subtasks,
		})
	} catch (err) {
		return res.status(404).json({ error: 'Detail List Not Found' })
	}
}

// Create list on POST
// Use array of middleware function. 
// The array is passed to the router function and each method is called in order.
exports.create_list = [
	// Validate and sanitize the name field.
	body('name', 'List name is required')
		.trim()
		.isLength({ min: 1 })
		.escape(),

	// Process request after validation and sanitization.
	async (req, res, next) => {
		// Extract the validation errors from a request.
		const errors = validationResult(req);
		// Create a list object with escaped and trimmed data.
		const list = new List({ name: req.body.name })

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		} else {
			// Data from form is valid.
			// Check if List with same name already exists.
			try {
				const check = await List.findOne({ name: req.body.name }).exec()
				if (check) {
					return res.status(400).json({ errors: 'List already existed' })
				} else {
					const new_list = await list.save()
					return res.status(200).json({new_list})
				}
			} catch (err) {
				return res.status(400).json({ error: 'List can not save' })
			}
		}
	}
]

//Delete list on POST
exports.delete_list = (req, res) => {
	res.send('NOT IMPLEMENTED: delete list')
}

//Update list on POST
exports.update_list = (req, res) => {
	res.send('NOT IMPLEMENTED: update list')
}