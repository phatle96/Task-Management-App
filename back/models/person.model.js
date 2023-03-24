const mongoose = require("mongoose");
const nanoid = require('nanoid');

const Schema = mongoose.Schema;

const generateID = nanoid.customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

const PersonSchema = new Schema({
	person_id: { 
		type: String, 
		required: true, 
		unique: true, 
		default: () => `person_${generateID()}` },
	name: { type: String, required: true, maxLength: 100 },
},
{
	timestamps: true,
});

PersonSchema.virtual('url').get(function(){
	return `/person/${this.person_id}`;
})

module.exports = mongoose.model('Person', PersonSchema)