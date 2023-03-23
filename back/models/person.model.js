const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PersonSchema = new Schema({
	name: { type: String, required: true, maxLength: 100 },
});

PersonSchema.virtual('url').get(function(){
	return '/person/${this._id}';
})

module.exports = mongoose.model('Person', PersonSchema)