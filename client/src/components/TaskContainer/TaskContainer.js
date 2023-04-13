import { useState, useEffect } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import TaskCard from "../TaskCard/TaskCard";
import axios from 'axios'

const TaskContainer = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

    return (
        <Grid2 container>
            <Grid2 xs={12} sm={6} md={6} lg={4} >
                {data.map(
                    task => (
                        <TaskCard
                            key={task.task_id}
                            data = {task}/>
                    )
                )}
            </Grid2>
        </Grid2>
    )
}

export default TaskContainer;