const mongoose = require("mongoose");
const nanoid = require('nanoid');

const Schema = mongoose.Schema;

const generateID = nanoid.customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

const ListSchema = new Schema({
	list_id: { 
		type: String, 
		required: true, 
		unique: true, 
		default: () => `list_${generateID()}` },
	name: { type: String, required: true, maxLength: 100 },
},
{
	timestamps: true
});

ListSchema.virtual('url').get(function(){
	return `/list/${this.list_id}`;
})

module.exports = mongoose.model('List', ListSchema)