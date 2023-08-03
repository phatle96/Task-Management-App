import { Alert, Box, Checkbox, Grow, Paper, Snackbar, Stack, Zoom } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import MuiAlert from '@mui/material/Alert';

import TaskCard from "../TaskCard/TaskCard";
import SubTask from "../SubTask/SubTask";
import TaskDialog from "../TaskDialog/TaskDialog";

import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from 'react-redux'
import { fetchTasks, initTask, selectTasksByStatus, updateTask } from "../../features/tasks/tasksSlice";
import { fetchSubtasks } from "../../features/subtasks/subtasksSlice";
import { fetchPeople } from "../../features/people/peopleSlice";
import ListFolder from "../ListFolder/ListFolder";
import TaskCardSkeleton from "../Skeletons/TaskCardSkeleton";
import { selectFilters } from "../../features/filters/filtersSlice";


const TaskContainer = ({ tasks }) => {

	const [open, setOpen] = useState(false);
	const [editTask, setEditTask] = useState();

	const dispatch = useDispatch();
	const tasksStatus = useSelector((state) => state.tasks.status);
	const subtasksStatus = useSelector((state) => state.subtasks.status);
	const peopleStatus = useSelector((state) => state.people.status);
	const taskByStatus = useSelector(selectTasksByStatus)
	const filters = useSelector(selectFilters)

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
				content: task.content,
				is_completed: !task.is_completed
			}
		};
		dispatch(updateTask(payload));
	}

	const handleOpenCard = (task) => {
		setEditTask(task)
		setOpen(true);
	}

	const TasksList = ({ data }) => {
		return (
			data.map(
				task => {
					return (
						<Paper display="flex" key={task.task_id} variant="outlined" sx={{ paddingBottom: 2, width: 'inherit', marginBottom: 1, borderColor: 'darkgray' }} >
							<Stack direction="row" sx={{ width: "100%" }}>
								<Stack direction="column">
									<Box
										sx={
											(task.person?.length || task.start_date) ?
												{ display: "flex", alignItems: "baseline", paddingTop: '58px' } :
												{ display: "flex", alignItems: "baseline", paddingTop: '10px' }}
									>
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

	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});

	return (
		<>
			<Grid2 container xs={12} sm={12} md={12} lg={12}>
				{
					tasksStatus === 'loading' ?
						<>
							{
								Array.from(Array(3).keys()).map(
									element =>
										< TaskCardSkeleton key={element} />
								)
							}
						</>
						:
						<TasksList data={tasks ? tasks : taskByStatus} />
				}
				<Snackbar open={tasksStatus === 'loading'} autoHideDuration={6000}
					transitionDuration={{ exit: 9000 }}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} >
					<Alert severity="info" sx={{ width: '100%' }}>
						Service is hosted on free tier server, will take a little time. Please be patient!
					</Alert>
				</Snackbar>
			</Grid2>
			<TaskDialog data={editTask} open={open} setOpen={setOpen} />
		</>
	)
}

export default TaskContainer;