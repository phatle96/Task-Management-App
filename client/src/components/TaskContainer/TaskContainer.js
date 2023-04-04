import React from "react";
import { Box } from "@mui/material";
import TaskCard from "../TaskCard/TaskCard";

const TaskContainer = () => {
    return (
    <Box>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
    </Box>
)
}

export default TaskContainer;