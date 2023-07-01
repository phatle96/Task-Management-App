import { useState, useEffect } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import TaskCard from "../TaskCard/TaskCard";
import { Box, Checkbox, Chip, Paper, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import SubTask from "../SubTask/SubTask";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import AddTask from "../AddTask/AddTask";
import { useSelector, useDispatch } from 'react-redux'
import { fetchTasks, selectTasksByStatus, updateTask } from "../../features/tasks/tasksSlice";
import { fetchSubtasks } from "../../features/subtasks/subtasksSlice";
import { fetchPeople } from "../../features/people/peopleSlice";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer"
import InfiniteScroll from 'react-infinite-scroll-component';

const TaskContainer = () => {

	const [open, setOpen] = useState(false);

	const dispatch = useDispatch();
	const tasksStatus = useSelector((state) => state.tasks.status);
	const subtasksStatus = useSelector((state) => state.subtasks.status);
	const peopleStatus = useSelector((state) => state.people.status);
	const tasks = useSelector(selectTasksByStatus);
	const totalTasks = tasks.length

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
				list_id: task.list.list_id,
				is_completed: !task.is_completed
			}
		};
		dispatch(updateTask(payload));
	}

	const handleOpenCard = (task) => {
		setOpen(true);

	}

	const handleCloseCard = () => {
		setOpen(false)
	}

	const TaskDialog = () => {
		return (
			<Dialog
				open={open}
				onClose={handleCloseCard}
				scroll='paper'
				aria-labelledby="edit-note-title"
				maxWidth="sm"
				fullWidth={1}
			>
				<DialogTitle id="edit">
					Task
				</DialogTitle>
				<DialogContent dividers={1}>
					<AddTask />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseCard}>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		)
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
										handleOpenCard(task);
									}} >
									<TaskCard data={task} />
									<SubTask task={task} />
									<Box sx={{ display: "flex", justifyContent: "flex-end", paddingRight: 1, paddingTop: 2 }}>
										<Chip icon={<FolderOpenIcon />} label={task.list.name} size="small" />
									</Box>
								</Stack>
							</Stack>
						</Paper>
					)
				}
			)
		)
	}

	const GridContainer = ({ children }) => {
		return (
			<Grid2 container>
				{children}
			</Grid2>
		);
	};

	const taskRow = ({ index, style }) => {
		return (
			<Grid2 xs={12} sm={12} md={12} lg={12} item style={style} key={index} >
				<Paper display="flex" variant="outlined" sx={{ paddingBottom: 2, width: 'inherit', marginBottom: 1 }} >
					<Stack direction="row" sx={{ width: "100%" }}>
						<Stack direction="column">
							<Box sx={{ display: "flex", alignItems: "baseline", paddingTop: 7 }}>
								<Checkbox onChange={() => handleChecked(tasks[index])} checked={tasks[index].is_completed} />
							</Box>
						</Stack>
						<Stack direction="column"
							sx={{ width: "100%" }}
							onClick={() => {
								handleOpenCard(tasks[index]);
							}} >
							<TaskCard data={tasks[index]} />
							<SubTask task={tasks[index]} />
							<Box sx={{ display: "flex", justifyContent: "flex-end", paddingRight: 1, paddingTop: 2 }}>
								<Chip icon={<FolderOpenIcon />} label={tasks[index].list.name} size="small" />
							</Box>
						</Stack>
					</Stack>
				</Paper>
			</Grid2>
		)
	}

	return (
		<>
			<Grid2 container xs={12} sm={12} md={12} lg={12}>
				<TasksList />
			</Grid2>
			<TaskDialog />
		</>
	)
}

export default TaskContainer;