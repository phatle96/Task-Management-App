const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SubtaskSchema = new Schema({
    content: { type: String, required: true, maxLength: 300 },
    date_created: { type: Date, required: true, default: Date.now },
    updated: { type: Date },
    list: { type: Schema.Types.ObjectId, required: true, ref: 'List' },
    task: { type: Schema.Types.ObjectId, required: true, ref: 'Task' },
    person: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
    alert: { type: Date },
    is_completed: { type: Boolean, default: false }
});

SubtaskSchema.virtual('url').get(function () {
    return '/subtask/${this._id}';
})

module.exports = mongoose.model('Subtask', SubtaskSchema)