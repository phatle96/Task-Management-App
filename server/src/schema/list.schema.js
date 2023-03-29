const params = {
	list_id: {
		in: ['params'],
		isLength: {
			errorMessage: "ID is invalid",
			options: { min: 1, max: 50 }
		},
		escape: true
	},
};

const payload = {
	list_id: {
		in: ['body'],
		optional: {
			options: { nullable: true },
		},
		isLength: {
			errorMessage: "ID should not be included",
			options: { max: 0 },
		},
		escape: true,
	},

	name: {
		in: ['body',],
		isLength: {
			errorMessage: "Name should be at least 1 to 100 characters long",
			options: { min: 1, max: 100 },
		},
		escape: true,
	},

	is_deleted: {
		in: ['body'],
		optional: {
			options: { nullable: true },
		},
		isLength: {
			errorMessage: "Delete state should not be included",
			options: { max: 0 },
		},
		escape: true,
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
		escape: true,
	},

};

exports.get_list_schema = { ...params };
exports.delete_list_schema = { ...params };
exports.create_list_schema = { ...payload };
exports.update_list_schema = { ...params, ...payload };