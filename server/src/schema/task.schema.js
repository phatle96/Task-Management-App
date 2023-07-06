const check_array = (value) => {
    if (typeof value === 'object' && Array.isArray(value) && value.length) {
        return true;
    } else {
        throw new Error('Object is not an Array')
    };
}

const params = {
    task_id: {
        in: ['params'],
        isLength: {
            errorMessage: "ID is invalid",
            options: { min: 1, max: 50 },
        },
        escape: true,
    },
};

const payload = {
    task_id: {
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

    content: {
        in: ['body'],
        isLength: {
            errorMessage: "Name should be at least 1 to 300 characters long",
            options: { max: 300 },
        },
    },

    list: {
        in: ['body'],
        optional: {
            options: { nullable: true },
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
            options: { nullable: true },
        },
        isISO8601: {
            errorMessage: 'Invalid date',
        },
        escape: true
    },

    start_date: {
        in: ['body'],
        optional: {
            options: { nullable: true },
        },
        isISO8601: {
            errorMessage: 'Invalid date',
        },
        escape: true
    },

    end_date: {
        in: ['body'],
        optional: {
            options: { nullable: true },
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
        isBoolean: {
            errorMessage: 'Invalid boolean'
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

exports.get_task_schema = { ...params };
exports.delete_task_schema = { ...params };
exports.create_task_schema = { ...payload };
exports.update_task_schema = { ...params, ...payload }; 