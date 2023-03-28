const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;


const ListSchema = new Schema({
	list_id: { type: String, required: true, unique: true, default: () => `list_${uuidv4()}` },
	name: { type: String, required: true, maxLength: 100 },
	is_deleted: { type: Boolean, required: true, default: false },
},
	{
		timestamps: true
	});

ListSchema.virtual('url').get(function () {
	return `/list/${this.list_id}`;
})

module.exports = mongoose.model('List', ListSchema)