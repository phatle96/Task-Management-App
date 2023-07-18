const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;

const PersonSchema = new Schema(
	{
		person_id: { type: String, required: true, unique: true, default: () => `person_${uuidv4()}` },
		name: { type: String, unique: true, required: true, maxLength: 100 },
		avatar: { type: String },
		default_avatar: { type: String, default: defaultAvatar },
		is_deleted: { type: Boolean, required: true, default: false },
		deleted_at: { type: Date, expires: '30d' },
	},
	{
		timestamps: true,
	},
	{
		toJSON: { getters: true }
	},
);

PersonSchema.virtual('url').get(function () {
	return `/person/${this.person_id}`;
})

function defaultAvatar() {
	const firstChar = this.name.charAt(0);
	return firstChar;
}

module.exports = mongoose.model('Person', PersonSchema)