import { Accordion, AccordionDetails, Box, Checkbox, Stack, Typography } from "@mui/material";
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from "react-redux";
import { selectSubtasksByTaskId, updateSubtask } from "../../features/subtasks/subtasksSlice";


const SubTask = ({ task }) => {

    const dispatch = useDispatch();
    const data = useSelector((state) => selectSubtasksByTaskId(state, task.task_id));

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

    const handleChecked = (subtask) => {
        const payload = {
            id: subtask.subtask_id,
            payload: {
                is_completed: !subtask.is_completed
            }
        };
        dispatch(updateSubtask(payload));
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
                                    onChange={() => handleChecked(subtask)}
                                    checked={subtask.is_completed ? true : false}
                                />
                                {subtask.is_completed ?
                                    (
                                        <Typography variant='body2'
                                            sx={{ textDecoration: "line-through", borderBottom: 0.5, borderColor: "lightslategrey", width: "100%" }}>
                                            {subtask.content}
                                        </Typography>
                                    ) : (
                                        <Typography variant='body2'
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
            {subtasks(data)}
        </Box>
    )
}

export default SubTask;