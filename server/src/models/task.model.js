const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    task_id: { type: String, required: true, unique: true, default: () => `task_${uuidv4()}` },
    content: { type: String, reqired: true, maxLength: 300 },
    list: { type: Schema.Types.ObjectId, required: true, ref: 'List' },
    person: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
    alert: { type: Date },
    is_completed: { type: Boolean, required: true, default: false },
    is_deleted: { type: Boolean, required: true, default: false },
},
    {
        timestamps: true
    }
);

TaskSchema.virtual('url').get(function () {
    return `/task/${this.task_id}`;
})

module.exports = mongoose.model('Task', TaskSchema)