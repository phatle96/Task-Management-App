const Person = require('../models/person.model');
const { matchedData } = require('express-validator');
const {
	find_all_people,
	find_person_query,
	find_and_update_person_query,
	delete_person_query,
	create_person_query } = require('../services/person.service');


//View all people on GET
exports.people = async (req, res, next) => {
	try {
		const people = await find_all_people();
		if (people.length == 0 || people == null) {
			return res.status(404).json({ 404: "Not Found" });
		} else {
			return res.status(200).json(people);
		}
	} catch (err) {
		return res.status(500).json(err);
	}
};

//View detail person on GET
exports.get_person = async (req, res, next) => {
	try {
		const req_param = req.params;
		const person = await find_person_query(req_param);
		if (person == null || person.length == 0) {
			return res.status(404).json({ 404: 'Not found' });
		} else {
			return res.status(200).json(person);
		}
	} catch (err) {
		return res.status(500).json({ 500: 'Controller Error' });
	}
}

//Create person on POST
exports.create_person = async (req, res, next) => {
	try {
		const req_body = matchedData(req, { locations: ['body'] });
		const person = await create_person_query(req_body);
		return res.status(200).json(person);
	} catch (err) {
		return res.status(500).json({ 500: "Controller Error" });
		//return res.status(500).json({error: err});
	}
}

//Update person on POST
exports.update_person = async (req, res, next) => {
	try {
		const req_param = matchedData(req, { locations: ['params'] });
		const req_body = matchedData(req, { locations: ['body'] });
		const person = await find_and_update_person_query(req_param, req_body);
		return res.status(200).json(person);
	} catch (err) {
		return res.status(500).json({ 500: "Controller Error" });
	}
};

//Delete person on DELETE
exports.delete_person = async (req, res, next) => {
	try {
		const req_param = matchedData(req, { locations: ['params'] });
		const person = await delete_person_query(req_param);
		if (person == null || person.length == 0) {
			return res.status(404).json({ 404: "Not found" });
		} else {
			return res.status(200).json(person);
		}
	} catch (err) {
		return res.status(500).json({ 500: "Controller Error" });
	}
};
