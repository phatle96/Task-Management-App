const mongoose = require("mongoose");
const nanoid = require('nanoid');

const Schema = mongoose.Schema;

const generateID = nanoid.customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

const TaskSchema = new Schema({
    task_id: { 
		type: String, 
		required: true, 
		unique: true, 
		default: () => `task_${generateID()}` },
    content: { type: String, reqired: true, maxLength: 300 },
    list: { type: Schema.Types.ObjectId, required: true, ref: 'List' },
    person: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
    alert: { type: Date },
    is_completed: { type: Boolean, default: false }
},
{
    timestamps: true
});

TaskSchema.virtual('url').get(function () {
    return `/task/${this.task_id}`;
})

module.exports = mongoose.model('Task', TaskSchema)