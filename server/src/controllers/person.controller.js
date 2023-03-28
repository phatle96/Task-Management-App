const Person =   require('../models/person.model');

//View all people on GET
exports.people = (req, res) => {
    res.send('NOT IMPLEMENTED: view all people')
}

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

//Delete person on POST
exports.delete_person = (req, res) => {
    res.send('NOT IMPLEMENTED: delete person')
}

//Update person on POST
exports.update_person = (req, res) => {
    res.send('NOT IMPLEMENTED: update person')
}