const Person =   require('../models/person.model');

//View all people on GET
exports.people = (req, res) => {
    res.send('NOT IMPLEMENTED: view all people')
}

//View detail person on GET
exports.get_person = (req, res) => {
    res.send('NOT IMPLEMENTED: view person detail ${req.params.id}')
}

//Create person on POST
exports.create_person = (req, res) => {
    res.send('NOT IMPLEMENTED: create person')
}

//Delete person on POST
exports.delete_person = (req, res) => {
    res.send('NOT IMPLEMENTED: delete person')
}

//Update person on POST
exports.update_person = (req, res) => {
    res.send('NOT IMPLEMENTED: update person')
}