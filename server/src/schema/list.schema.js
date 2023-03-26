
const params = {
	id: {
		in: ['params', 'query'],
		isLength: {
			errorMessage: "List ID is required ",
			options: { min: 2, max: 150 },
		},
	},
};

const payload = {
	name: {
		in: ['body',],
		isLength: {
			errorMessage: "Name should be at least 1 to 150 characters long ",
			options: { min: 2, max: 150 },
		},
	},
};

exports.get_list_schema = {...params};
exports.delete_list_schema = {...params};
exports.create_list_schema = {...payload};
exports.update_list_schema = {...params, ...payload};