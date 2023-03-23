import React from "react";

export const data = [
	{
		listID: 'l001',
		listName: 'Personal',
		listTask: [
			{
				taskID: 't001',
				isChecked: false,
				taskContent: 'wake up',
				taskDate: '07:00 01/10/2023',

			},
			{
				taskID: 't002',
				isChecked: false,
				taskContent: 'eat breakfast',
				taskDate: '08:00 01/10/2023'
			}
		],
	},
	{
		listID: 'l002',
		listName: 'To do',
		listTask: [
			{
				taskID: 't003',
				isChecked: false,
				taskContent: 'Create web app',
				taskDate: '01/11/2023'
			}
		],
		subTask: [
			{
				subTaskID: 'st000',
				taskID: 't003',
				isChecked: false,
				taskContent: 'Learn web development technical',
			},
			{
				subTaskID: 'st001',
				taskID: 't003',
				isChecked: false,
				taskContent: 'Design UI',
			},
			{
				subTaskID: 'st002',
				taskID: 't003',
				isChecked: false,
				taskContent: 'Create front-end',
			},
			{
				subTaskID: 'st003',
				taskID: 't003',
				isChecked: false,
				taskContent: 'Create back-end',
			},
			{
				subTaskID: 'st004',
				taskID: 't003',
				isChecked: false,
				taskContent: 'Testing',
			},
		],
	},
];