import { useState, useEffect } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import TaskCard from "../TaskCard/TaskCard";
import axios from 'axios';
import {Box, Checkbox, Chip, Paper, Stack } from "@mui/material";
import SubTask from "../SubTask/SubTask";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

const TaskContainer = ({ isCompleted }) => {

	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [id, setID] = useState();
	const [list, setList] = useState();
	const [updated, setUpdate] = useState({});
	const [payload, setPayload] = useState({});
	const [hover, setHover] = useState(false)


	useEffect(() => {
		const getData = async () => {
			try {
				const response = await axios.get('http://localhost:8080/api/task/all');
				if (response.status !== 200) {
					throw new Error(
						`This is an HTTP error: The status is ${response.status}`
					);
				}
				setData(response.data);
				setError(null);
			} catch (err) {
				setError(err.message);
				setData(null);
			}
		}
		getData();
	}, []);


	useEffect(() => {
		const putData = async () => {
			try {
				const response = await axios.put(`http://localhost:8080/api/task/${id}/update`, payload);
				if (response.status !== 200) {
					throw new Error(
						`This is an HTTP error: The status is ${response.status}`
					);
				}
				setError(null);
			} catch (err) {
				setError(err.message);
			}
		}
		putData();
	}, [updated, id]);


	const handleChecked = (key) => {
		setData(
			data.map(task => {
				if (task.task_id === key) {
					const payload = {
						content: task.content,
						list: task.list._id,
						is_completed: !isCompleted,
					};
					setPayload(payload);
					const update = { ...task, is_completed: !isCompleted };
					setID(task.task_id);
					setList(task.list._id);
					setUpdate(update);
					return update;
				} else {
					return task;
				}
			})
		)
	}

	return (
		<Grid2 container rowSpacing={2} columnSpacing={1} sx={{ alignItems: "center" }}>
			{data.map(
				task => {
					return (
						task.is_completed === isCompleted &&
						(<Grid2 xs={12} sm={12} md={12} lg={12}
							key={task.task_id}>
							<Paper elevation={3} variant="outlined" sx={{ paddingBottom: 1 }}>
								<Stack direction="row" sx={{ width: "100%" }}>
									<Stack direction="column">
										<Box sx={{ display: "flex", alignItems: "baseline", paddingTop: 7 }}>
											<Checkbox onChange={() => handleChecked(task.task_id)} checked={isCompleted}/>
										</Box>
									</Stack>
									<Stack direction="column" sx={{ width: "100%" }} >
										<TaskCard data={task} />
										<SubTask task={task} />
										<Box sx={{ display: "flex", justifyContent: "flex-end", paddingRight: 1, paddingTop: 2 }}>
											<Chip icon={<FolderOpenIcon />} label={task.list.name} size="small" />
										</Box>
									</Stack>
								</Stack>
							</Paper>
						</Grid2>))
				}
			)}
		</Grid2>
	)
}

export default TaskContainer;