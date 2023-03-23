const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    content: { type: String, reqired: true, maxLength: 300 },
    date_created: { type: Date, required: true, default: Date.now },
    updated: { type: Date },
    list: { type: Schema.Types.ObjectId, required: true, ref: 'List' },
    person: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
    alert: { type: Date },
    is_completed: { type: Boolean, default: false }
});

TaskSchema.virtual('url').get(function () {
    return '/task/${this._id}';
})

module.exports = mongoose.model('Task', TaskSchema)