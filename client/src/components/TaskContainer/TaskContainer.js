import React from "react";
import { Box, Stack } from "@mui/material";
import TaskCard from "../TaskCard/TaskCard";


const TaskContainer = () => {
    return (
    <Stack alignItems="stretch">
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
    </Stack>
)
}

export default TaskContainer;