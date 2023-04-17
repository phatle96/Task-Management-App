import { useState, useEffect } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import TaskCard from "../TaskCard/TaskCard";
import axios from 'axios'
import { Box, Checkbox, Paper, Stack } from "@mui/material";
import SubTask from "../SubTask/SubTask";

const CompletedContainer = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [id, setID] = useState();
	const [updated, setUpdate] = useState({});


    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/task/all')
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
            } finally {
                setLoading(false);
            }
        }
        getData()
    }, [])

    useEffect(() => {
        const putData = async () => {
            try {
                const payload = (({ content, list, is_completed }) => ({ content, list, is_completed }))(updated);
                const response = await axios.put(`http://localhost:8080/api/task/${id}/update`, payload);
                if (response.status !== 200) {
                    throw new Error(
                        `This is an HTTP error: The status is ${response.status}`
                    );
                }
                console.log(response.data);
                setError(null);
            } catch (err) {
                setError(err.message);
            }
        }
        putData();
    }, [updated])

    const handleChecked = (key) => {
        setData(
            data.map(task => {
                if (task.task_id === key) {
                    const update = { ...task, is_completed: false };
                    setID(task.task_id);
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
                        task.is_completed &&
                        (<Grid2 xs={12} sm={12} md={12} lg={12}
                            key={task.task_id}>
                            <Paper elevation={0} variant="outlined" sx={{ paddingBottom: 3 }}>
                                <Stack direction="row" sx={{ width: "100%" }}>
                                    <Box sx={{ display: "flex", alignItems: "baseline", paddingTop: 6 }}>
                                        <Checkbox defaultChecked onChange={() => handleChecked(task.task_id)} />
                                    </Box>
                                    <Stack direction="column" sx={{ width: "100%" }}>
                                        <TaskCard data={task} />
                                        <SubTask task={task} />
                                    </Stack>
                                </Stack>
                            </Paper>
                        </Grid2>))
                }
            )}
        </Grid2>
    )
}

export default CompletedContainer;