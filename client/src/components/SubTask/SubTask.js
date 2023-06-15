import { Accordion, AccordionDetails, Box, Checkbox, Stack, Typography } from "@mui/material";
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { styled } from '@mui/material/styles';
import { DataContext } from "../../context/DataContext";
import useAxiosPut from "../../hooks/useAxiosPut";


const SubTask = ({ task }) => {

    const [error, setError] = useState(null);
    const { subtasks: data, setSubtasks } = useContext(DataContext);

    const { putAPICall, data: responseData, putError, isLoading } = useAxiosPut();

    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', marginLeft: 1 }} />}
            {...props}
        />
    ))(({ theme }) => ({
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
            marginLeft: 1
        },
        '& .MuiAccordionSummary-content': {
            flexGrow: 0,
        },
    }));

    const get_completed = (data) => {
        return data.filter(subtask => subtask.is_completed === true).length
    }

    const handleChecked = (key) => {
        setSubtasks(
            data.map(
                subtask => {
                    if (subtask.subtask_id === key) {

                        const subtask_payload = {
                            id: subtask.subtask_id,
                            payload: {
                                content: subtask.content,
                                list: subtask.list,
                                task: subtask.task._id,
                                is_completed: !subtask.is_completed
                            }
                        };

                        putAPICall(subtask_payload);

                        return { ...subtask, is_completed: !subtask.is_completed };
                    } else {
                        return subtask;
                    }
                }
            )
        );
    }

    const subtasks = (data) => {
        if (data === null || data.length === 0) {
            return (
                <>
                </>
            )
        } else {
            const completed = get_completed(data);
            const total = data.length;
            return (
                <Accordion elevation={0}>
                    <AccordionSummary
                        sx={{ padding: 0, justifyContent: "start" }}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <Typography variant="button" >
                            {completed}/{total} completed
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails >
                        {data.map(subtask => (
                            <Stack direction="row" key={subtask.subtask_id} sx={{ alignItems: "center" }}>
                                <Checkbox
                                    inputProps={{ 'aria-label': `${subtask.subtask_id}` }}
                                    icon={<RadioButtonUncheckedIcon />}
                                    checkedIcon={<RadioButtonCheckedIcon />}
                                    onChange={() => handleChecked(subtask.subtask_id)}
                                    checked={subtask.is_completed ? true : false}
                                />
                                {subtask.is_completed ?
                                    (
                                        <Typography variant="body2"
                                            sx={{ textDecoration: "line-through", borderBottom: 0.5, borderColor: "lightslategrey", width: "100%" }}>
                                            {subtask.content}
                                        </Typography>
                                    ) : (
                                        <Typography variant="body2"
                                            sx={{ borderBottom: 0.5, borderColor: "lightslategrey", width: "100%" }}>
                                            {subtask.content}
                                        </Typography>
                                    )
                                }
                            </Stack>))}
                    </AccordionDetails>
                </Accordion>
            )
        }
    }

    return (
        <Box sx={{ width: "100%", marginLeft: "auto" }}
            onClick={(e) => { e.stopPropagation() }}>
            {subtasks(data.filter(subtask => subtask.task.task_id === task.task_id))}
        </Box>
    )
}

export default SubTask;