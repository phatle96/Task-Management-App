const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;

const PersonSchema = new Schema({
	person_id: { 
		type: String, 
		required: true, 
		unique: true, 
		default: () => `person_${uuidv4()}` },
	name: { type: String, required: true, maxLength: 100 },
},
{
	timestamps: true,
});

PersonSchema.virtual('url').get(function(){
	return `/person/${this.person_id}`;
})

module.exports = mongoose.model('Person', PersonSchema)