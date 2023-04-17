import { Accordion, AccordionDetails, Box, Checkbox, Stack, Typography } from "@mui/material";
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { useState, useEffect } from "react";
import axios from "axios";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { styled } from '@mui/material/styles';


const SubTask = ({ task }) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [id, setID] = useState()
    const [updated, setUpdate] = useState({});
    const [payload, setPayload] = useState({})

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/subtask/all');
                if (response.status !== 200) {
                    throw new Error(
                        `This is an HTTP error: The status is ${response.status}`
                    );
                }
                const data = response.data.filter(subtask => subtask.task.task_id === task.task_id)
                setData(data);
                setError(null);
            } catch (err) {
                setError(err.message);
                setData(null);
            }
        }
        getData();
    }, [])

    useEffect(() => {
        const putData = async () => {
            try {
                const response = await axios.put(`http://localhost:8080/api/subtask/${id}/update`, payload);
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
    }, [updated, id])

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
        setData(
            data.map(subtask => {
                if (subtask.subtask_id === key) {
                    const payload = {
                        content: subtask.content,
                        list: subtask.list,
                        task: subtask.task._id,
                        is_completed: !subtask.is_completed
                    }
                    setPayload(payload)
                    const update = { ...subtask, is_completed: !subtask.is_completed }
                    setUpdate(update);
                    setID(subtask.subtask_id);
                    return update;
                } else {
                    return subtask;
                }
            })
        )
    }

    const subtasks = (data) => {
        if (data === null || data.length === 0) {
            return (<> </>)
        } else {
            const completed = get_completed(data)
            const total = data.length
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
                                        <Typography variant="body2" sx={{ borderBottom: 0.5, borderColor: "lightslategrey", width: "100%" }}>
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
        <Box sx={{ width: "100%", marginLeft: "auto" }}>
            {subtasks(data)}
        </Box>
    )
}

export default SubTask;