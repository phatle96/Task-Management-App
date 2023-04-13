const params = {
	person_id: {
		in: ['params'],
		isLength: {
			errorMessage: "ID is invalid",
			options: { min: 1, max: 50 }
		},
		escape: true,
	},
};

const payload = {

	person_id: {
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

	avatar: {
		in: ['body',],
		optional: {
			options: { nullable: true },
		},
		escape: true,
	},

	default_avatar: {
		in: ['body',],
		optional: {
			options: { nullable: true },
		},
		isLength: {
			errorMessage: "Default avatar should not be included",
			options: { max: 0 },
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


exports.get_person_schema = { ...params };
exports.delete_person_schema = { ...params };
exports.create_person_schema = { ...payload };
exports.update_person_schema = { ...params, ...payload };