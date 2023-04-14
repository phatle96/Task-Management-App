import { Accordion, AccordionDetails, Box, Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { useState, useEffect } from "react";
import axios from "axios";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { styled } from '@mui/material/styles';


const SubTask = ({ task }) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/task/${task.task_id}/subtask`)
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

    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
            {...props}
        />
    ))(({ theme }) => ({
        flexDirection: 'row-reverse',

        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1),
        },
    }));

    const get_completed = (data) => {
        return data.filter(subtask => subtask.is_completed == true).length
    }

    const subtasks = (data) => {
        if (data === null || data.length === 0) {
            return (<> </>)
        } else {
            const completed = get_completed(data)
            const total = data.length
            return (
                <Accordion elevation={0} >
                    <AccordionSummary
                        sx={{ padding: 0 }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <Typography variant="body1">
                            {completed}/{total} subtasks
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails >
                        {data.map(subtask => (

                            <Stack direction="row" key={subtask.subtask_id} sx={{ alignItems: "center" }}>
                                <Checkbox
                                    inputProps={{ 'aria-label': `${subtask.subtask_id}` }}
                                    icon={<RadioButtonUncheckedIcon />}
                                    checkedIcon={<RadioButtonCheckedIcon />}
                                />
                                <Typography variant="body2">
                                    {subtask.content}
                                </Typography>
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