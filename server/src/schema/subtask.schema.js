const check_array = (value) => {
	if (typeof value === 'object' && Array.isArray(value) && value.length) {
		return true;
	} else {
		throw new Error('Object is not an Array')
	};
}


const params = {
	subtask_id: {
		in: ['params', 'query'],
		isLength: {
			errorMessage: "ID is invalid",
			options: { min: 1, max: 50 },
		},
		escape: true,
	},
}

const payload = {
	subtask_id: {
		in: ['body'],
		optional: {
			options: { nullable: true },
		},
		escape: true,
	},

	content: {
		in: ['body'],
		isLength: {
			errorMessage: "Content should be at least 1 to 300 characters long",
			options: { min: 1, max: 300, },
		},
		escape: true,
	},

	list: {
		in: ['body'],
		isLength: {
			errorMessage: "List is invalid",
			options: { min: 1, max: 50 },
		},
		escape: true,
	},

	task: {
		in: ['body'],
		isLength: {
			errorMessage: 'Task is invalid',
			options: { min: 1, max: 50 },
		},
		escape: true,
	},

	person: {
		in: ['body'],
		optional: {
			options: {
				nullable: true,
				custom: (value) => check_array(value),
			}
		},
	},

	'person.*.person_id': {
		in: ['body'],
		optional: {
			options: { nullable: true, },
		},
		escape: true,
	},

	alert: {
		in: ['body'],
		optional: {
			options: { nullable: true, },
		},
		isISO8601: {
			errorMessage: 'Invalid date',
		},
		escape: true
	},

	is_completed: {
		in: ['body'],
		optional: {
			options: { nullable: true },
		},
		isBoolean: {
			errorMessage: 'Invalid boolean'
		},
		escape: true
	},

	is_deleted: {
		in: ['body'],
		optional: {
			options: { nullable: true },
		},
		escape: true
	},

	deleted_at: {
		in: ['body'],
		optional: {
			options: { nullable: true },
		},
		isLength: {
			errorMessage: "Delete date should not be included",
			options: { max: 0 },
		},
		escape: true
	},
}

exports.get_subtask_schema = { ...params };
exports.delete_subtask_schema = { ...params };
exports.create_subtask_schema = { ...payload };
exports.update_subtask_schema = { ...params, ...payload };