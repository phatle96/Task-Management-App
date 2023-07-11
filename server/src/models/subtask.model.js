const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;

const SubtaskSchema = new Schema({
    subtask_id: { type: String, required: true, unique: true, default: () => `subtask_${uuidv4()}` },
    content: { type: String, required: true, maxLength: 300, default: "" },
    list: { type: Schema.Types.ObjectId, ref: 'List', default: null },
    task: { type: Schema.Types.ObjectId, required: true, ref: 'Task', default: null },
    person: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
    alert: { type: Date },
    is_completed: { type: Boolean, required: true, default: false },
    is_deleted: { type: Boolean, required: true, default: false },
    deleted_at: { type: Date, expires: '30d' },
},
    {
        timestamps: true
    }
);

SubtaskSchema.virtual('url').get(function () {
    return `/subtask/${this.subtask_id}`;
})

module.exports = mongoose.model('Subtask', SubtaskSchema)