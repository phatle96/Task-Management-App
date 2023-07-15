const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    task_id: { type: String, required: true, unique: true, default: () => `task_${uuidv4()}` },
    content: { type: String, required: true, maxLength: 300, default: "" },
    list: { type: Schema.Types.ObjectId, ref: 'List', default: null },
    person: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
    alert: { type: Date, default: null },
    start_date: { type: Date, default: null },
    end_date: { type: Date, default: null },
    is_allday: { type: Boolean, default: false },
    is_errordate: { type: Boolean, default: false },
    is_completed: { type: Boolean, required: true, default: false },
    is_deleted: { type: Boolean, required: true, default: false },
    deleted_at: { type: Date, expires: '30d' },
},
    {
        timestamps: true
    }
);

TaskSchema.virtual('url').get(function () {
    return `/task/${this.task_id}`;
})

module.exports = mongoose.model('Task', TaskSchema)