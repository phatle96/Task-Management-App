const zod = require('zod');

const payload = {
	body: zod.object({
		name: string({ required_error: "List name is required" })
			.max(300, { required_error: "Must is fewer 300 characters long" }),
	}),
};

const params = {
	params: zod.object({
		list_id: zod.string({ required_error: "list_id is required " })
	})
};

export const get_list_schema = zod.object({
	...params,
});

export const delete_list_schema = zod.object({
	...params,
});

export const create_list_schema = zod.object({
	...payload,
	...params,
});

export const update_list_schema = zod.object({
	...payload,
	...params,
});



