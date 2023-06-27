import { useState, useEffect, useContext } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import TaskCard from "../TaskCard/TaskCard";
import axios from 'axios';
import { Box, Checkbox, Chip, Paper, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import SubTask from "../SubTask/SubTask";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { DataContext } from "../../context/DataContext";
import AddTask from "../AddTask/AddTask";
import { useSelector, useDispatch } from 'react-redux'
import { fetchTasks, selectAllTasks, tasksFilterSelector } from "../../features/tasks/tasksSlice";

const TaskContainer = ({ isCompleted }) => {

	const [error, setError] = useState(null);
	const [open, setOpen] = useState(false);

	const dispatch = useDispatch();
	const status = useSelector((state) => state.tasks.status);
	const tasks = useSelector(selectAllTasks);
	// const tasksFilter = useSelector(tasksFilterSelector(tasks, 'list_59613088-d06c-499f-a9c1-531bda8de239'))

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchTasks())
		}
	}, [status, dispatch])

	const {
		setTasks,
		putTask, setPutTask,
		putSubtask, setPutSubtask,
	} = useContext(DataContext);


	const putData = async (task_payload, id) => {
		try {
			const response = await axios.put(`http://localhost:8080/api/task/${id}/update`, task_payload);
			if (response.status !== 200) {
				throw new Error(
					`This is an HTTP error: The status is ${response.status}`
				);
			}
			setError(null);
			console.log(task_payload)
		} catch (err) {
			setError(err.message);
		}
	}

	const handleChecked = (key) => {
		setTasks(
			tasks.map(task => {
				if (task.task_id === key) {
					const task_payload = {
						content: task.content,
						list: task.list._id,
						is_completed: !isCompleted,
					};
					const update = { ...task, is_completed: !isCompleted };
					putData(task_payload, task.task_id)
					return update;
				} else {
					return task;
				}
			})
		);
	}

	const handleOpenCard = (task) => {
		setOpen(true);
		setPutTask({
			id: task.task_id,
			payload: {
				list_id: task.list._id,
				content: task.content,
				people: task.person,
				alert: task.alert
			}
		});
		setPutSubtask({
			id: "",
			payload: {
				subtask_id: "",
				content: "",
				list: "",
				task_id: "",
			}
		});
	}

	const handleCloseCard = () => {
		setOpen(false)
	}

	const TaskDialog = ({ data }) => {
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

	return (
		<Grid2 container rowSpacing={2} columnSpacing={1} sx={{ alignItems: "center" }}>
			{
				tasks.map(
					task => {
						return (
							task.is_completed === isCompleted &&
							(<Grid2 xs={12} sm={12} md={12} lg={12}
								key={task.task_id}>
								<Paper variant="outlined" sx={{ paddingBottom: 1 }} >
									<Stack direction="row" sx={{ width: "100%" }}>
										<Stack direction="column">
											<Box sx={{ display: "flex", alignItems: "baseline", paddingTop: 7 }}>
												<Checkbox onChange={() => handleChecked(task.task_id)} checked={isCompleted} />
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
							</Grid2>
							)
						)
					}
				)
			}
			<TaskDialog data={putTask} />
		</Grid2>
	)
}

export default TaskContainer;