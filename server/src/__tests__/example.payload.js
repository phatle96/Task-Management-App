payload = {
	valid_list: {
		name: 'a valid list',
	},
	error_list: {
		list_id: 'error_id',
		name: 'a error list'
	},
	updated_list: {
		name: 'an updated list',
	},
	deleted_list: {
		name: 'a deleted list',
		is_deleted: true,
	},
	valid_task: {
		content: 'a valid task',
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
	error_subtask: {
		subtask_id: 'error_id',
		content: 'an error subtask',
	},
	updated_subtask: {
		content: 'an updated subtask',
	},
	deleted_subtask: {
		content: 'a deleted subtask',
		is_deleted: true,
	},
	valid_person: {
		name: 'a valid person',
	},
	error_person: {
		person_id: 'error_id',
		name: 'an error person',
	},
	updated_person: {
		name: 'an updated person',
	},
	deleted_person: {
		name: 'a deleted person',
		is_deleted: true,
	}
};

module.exports = payload;