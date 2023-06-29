import { useState, useEffect } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import TaskCard from "../TaskCard/TaskCard";
import { Box, Checkbox, Chip, Paper, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import SubTask from "../SubTask/SubTask";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import AddTask from "../AddTask/AddTask";
import { useSelector, useDispatch } from 'react-redux'
import { fetchTasks, selectTasksByStatus, updateTask } from "../../features/tasks/tasksSlice";

const TaskContainer = () => {

	const [open, setOpen] = useState(false);

	const dispatch = useDispatch();
	const status = useSelector((state) => state.tasks.status);
	const tasks = useSelector(selectTasksByStatus)

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchTasks())
		}
	}, [status, dispatch])

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

	return (
		<Grid2 container rowSpacing={2} columnSpacing={1} sx={{ alignItems: "center" }}>
			{
				tasks.map(
					task => {
						return (
							<Grid2 xs={12} sm={12} md={12} lg={12}
								key={task.task_id}>
								<Paper variant="outlined" sx={{ paddingBottom: 1 }} >
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
							</Grid2>
						)
					}
				)
			}
			<TaskDialog />
		</Grid2>
	)
}

export default TaskContainer;