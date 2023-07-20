import { Box, Checkbox, Chip, Paper, Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

import TaskCard from "../TaskCard/TaskCard";
import SubTask from "../SubTask/SubTask";
import TaskDialog from "../TaskDialog/TaskDialog";

import { useState, useEffect } from "react";

import { useSelector, useDispatch } from 'react-redux'
import { fetchTasks, initTask, selectTasksByStatus, updateTask } from "../../features/tasks/tasksSlice";
import { fetchSubtasks } from "../../features/subtasks/subtasksSlice";
import { fetchPeople } from "../../features/people/peopleSlice";
import ListFolder from "../ListFolder/ListFolder";


const TaskContainer = () => {

	const [open, setOpen] = useState(false);
	const [editTask, setEditTask] = useState();

	const dispatch = useDispatch();
	const tasksStatus = useSelector((state) => state.tasks.status);
	const subtasksStatus = useSelector((state) => state.subtasks.status);
	const peopleStatus = useSelector((state) => state.people.status);
	const tasks = useSelector(selectTasksByStatus);

	// fetch tasks
	useEffect(() => {
		if (tasksStatus === 'idle') {
			dispatch(fetchTasks())
		}
	}, [tasksStatus, dispatch]);

	// fetch subtasks
	useEffect(() => {
		if (subtasksStatus === 'idle') {
			dispatch(fetchSubtasks())
		}
	}, [subtasksStatus, dispatch]);

	// fetch people
	useEffect(() => {
		if (peopleStatus === 'idle') {
			dispatch(fetchPeople())
		}
	}, [peopleStatus, dispatch]);

	const handleChecked = (task) => {
		const payload = {
			id: task.task_id,
			payload: {
				is_completed: !task.is_completed
			}
		};
		dispatch(updateTask(payload));
	}

	const handleOpenCard = (task) => {
		setOpen(true);
		setEditTask(task)
	}

	const TasksList = () => {
		return (
			tasks.map(
				task => {
					return (
						<Paper display="flex" key={task.task_id} variant="outlined" sx={{ paddingBottom: 2, width: 'inherit', marginBottom: 1 }} >
							<Stack direction="row" sx={{ width: "100%" }}>
								<Stack direction="column">
									<Box sx={{ display: "flex", alignItems: "baseline", paddingTop: 7 }}>
										<Checkbox onChange={() => handleChecked(task)} checked={task.is_completed} />
									</Box>
								</Stack>
								<Stack direction="column"
									sx={{ width: "100%" }}
									onClick={() => {
										dispatch(initTask())
										handleOpenCard(task);
									}} >
									<TaskCard data={task} />
									<SubTask task={task} />
									{task.list &&
										<Box
											onClick={(event => { event.stopPropagation() })}
											sx={{ display: "flex", justifyContent: "flex-end", paddingRight: 1, paddingTop: 2 }}>
											<ListFolder list={task.list} task={task} />
										</Box>}
								</Stack>
							</Stack>
						</Paper>
					)
				}
			)
		)
	}

	return (
		<>
			<Grid2 container xs={12} sm={12} md={12} lg={12}>
				<TasksList />
			</Grid2>
			<TaskDialog data={editTask} open={open} setOpen={setOpen} />
		</>
	)
}

export default TaskContainer;