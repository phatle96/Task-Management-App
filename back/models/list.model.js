const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ListSchema = new Schema({
	name: { type: String, required: true, maxLength: 100 },
	date_created: { type: Date, required: true, default: Date.now },
});

ListSchema.virtual('url').get(function(){
	return '/list/${this._id}';
})

module.exports = mongoose.model('List', ListSchema)