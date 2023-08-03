import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, ToggleButton, ToggleButtonGroup, Tooltip, } from "@mui/material";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RestoreIcon from '@mui/icons-material/Restore';
import SynchronizeLoading from "../SynchronizeLoading/SynchronizeLoading";
import AddTask from "../AddTask/AddTask";

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import EventIcon from '@mui/icons-material/Event';

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { deleteTask, updateTask, } from "../../features/tasks/tasksSlice";
import { handleSubtaskField, handleTaskError, selectSubtaskField, selectTaskFieldError } from "../../features/fields/fieldsSlice";
import { selectSubtasksByTaskId } from "../../features/subtasks/subtasksSlice";


const TaskDialog = ({ data, open, setOpen }) => {

    const taskCreated = useSelector((state) => state.tasks.create.response)

    const taskFieldError = useSelector(selectTaskFieldError)
    const subtaskField = useSelector(selectSubtaskField)

    const subtasks = useSelector((state) => selectSubtasksByTaskId(state, (data ? data.task_id : null)));

    data = data ? data : (taskCreated ? taskCreated : null)

    const [remove, setRemove] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)
    const [toggles, setToggles] = useState(() => [])

    const dispatch = useDispatch();

    const handleCompleted = () => {
        const payload = {
            id: data.task_id,
            payload: { is_completed: !data.is_completed }
        }
        dispatch(updateTask(payload))
        setOpen(false)
    }

    const handleClose = () => {
        if (!taskFieldError && !subtaskField.error) {
            setOpen(false);
        } else {
            setOpenAlert(true)
        }

    }

    const handleCloseAlert = () => {
        setOpenAlert(false)
    }

    const handleDiscard = () => {
        setOpenAlert(false)
        setOpen(false)
        dispatch(handleTaskError(false))
        dispatch(handleSubtaskField({ ...subtaskField, error: false }))
    }

    const handleDelete = () => {
        setRemove(!remove)
    }

    const handleConfirmDelete = () => {
        const payload = { id: data.task_id, payload: { is_deleted: true } }
        dispatch(deleteTask(payload))
        setOpen(false)
        setRemove(false)
    }

    const handleToggles = (event, newToggles) => {
        setToggles(newToggles)
    }


    const ToggleButtonDialog = () => {
        return (
            <ToggleButtonGroup
                value={toggles}
                onChange={handleToggles}
                aria-label="select-toggle"
            >
                <ToggleButton value="subtasks" aria-label="subtasks">
                    <Tooltip title='Add subtasks' placement="top">
                        <ClearAllIcon fontSize='inherit' />
                    </Tooltip>
                </ToggleButton>
                <ToggleButton value="person" aria-label="person">
                    <Tooltip title='Assign task' placement="top">
                        <PersonAddAlt1Icon fontSize='inherit' />
                    </Tooltip>
                </ToggleButton>
                <ToggleButton value="event" aria-label="event">
                    <Tooltip title='Create event date' placement="top">
                        <EventIcon fontSize='inherit' />
                    </Tooltip>
                </ToggleButton>
            </ToggleButtonGroup>
        )
    }

    useEffect(() => {
        let actives = []
        if (subtasks.length) {
            actives.push('subtasks')
        }
        if (data?.person.length) {
            actives.push('person')
        }
        if (data?.start_date) {
            actives.push('event')
        }
        setToggles(actives)
    }, [open])

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll='paper'
                aria-labelledby="add-note-title"
                maxWidth="sm"
                fullWidth={1}>
                <DialogTitle id="add-note" sx={{ display: 'flex' }}>
                    {data ? (!remove ? 'Editing note' : 'Want to delete?') : 'Take a note'}
                    <Tooltip title='synchronizing...' placement='bottom'>
                        <span>
                            <SynchronizeLoading />
                        </span>
                    </Tooltip>
                    {data &&
                        <Button
                            onClick={() => { handleCompleted() }}
                            sx={{ marginLeft: 'auto' }}
                            endIcon={data.is_completed ? <RestoreIcon /> : <DoneAllIcon />}>
                            {data.is_completed ? 'doing' : 'completed'}
                        </Button>
                    }
                </DialogTitle>
                <DialogContent dividers={1} sx={remove ? { pointerEvents: "none", opacity: 0.8, filter: "blur(1.5px)" } : {}}>
                    <AddTask task={data} toggles={toggles} />
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'space-between' }}>
                    <ToggleButtonDialog />
                    <Box>
                        {!remove ?
                            <>
                                {data && <Button onClick={handleDelete} color='error'>Delete</Button>}
                                <Button onClick={handleClose} >Close</Button>
                            </> :
                            <>
                                <Button onClick={handleDelete} >Undo</Button>
                                <Button onClick={handleConfirmDelete} color='error'>Confirm</Button>
                            </>

                        }
                    </Box>
                </DialogActions>
            </Dialog >
            {openAlert &&
                <Dialog
                    open={openAlert}
                    scroll='paper'
                    aria-labelledby="error alert"
                    maxWidth="sm"
                    fullWidth={1}>
                    <DialogTitle>
                        Error!
                    </DialogTitle>
                    <DialogContent>
                        {(taskFieldError && !subtaskField.error) && 'Task should not be empty. Continue editing?'}
                        {(subtaskField.error && !taskFieldError) && 'Subtask should not be empty. Continue editing?'}
                        {(subtaskField.error && taskFieldError) && 'Task and subtask should not be empty. Continue editing?'}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDiscard} color='error' >Discard</Button>
                        <Button onClick={handleCloseAlert} >Continue</Button>
                    </DialogActions>
                </Dialog>
            }
        </>
    )
}

export default TaskDialog