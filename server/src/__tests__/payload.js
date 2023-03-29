
exports.payload = {
    error_list: {
		list_id: "an_error_id_123",
		name: "an error payload",
	},
	valid_list: {
		name: "a valid payload",
	},
	deleted_list: {
		name: "a deleted payload",
		is_deleted: true,
	},
	updated_list: {
		name: "an updated payload",
	},
    valid_task: {
        content: 'a valid tasm',
	},
	error_task: {
        task_id: '123',
        content: 'an error task',
	},
	deleted_task: {
        content: 'a deleted task',
        is_deleted: true
	},
	updated_task: {
        content: 'a updated task',
	},
	valid_subtask: {
        content: 'a valid subtask',
	},
};