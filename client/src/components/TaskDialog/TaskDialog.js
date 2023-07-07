import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Stack, Tooltip } from "@mui/material";
import SynchronizeLoading from "../SynchronizeLoading/SynchronizeLoading";
import AddTask from "../AddTask/AddTask";

import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { deleteTask, } from "../../features/tasks/tasksSlice";
import { handleTaskError, selectTaskFieldError } from "../../features/fields/fieldsSlice";


const TaskDialog = ({ data, open, setOpen }) => {

    const taskCreated = useSelector((state) => state.tasks.create.response)
    const taskFieldError = useSelector(selectTaskFieldError)

    data = data ? data : (taskCreated ? taskCreated : null)

    const [remove, setRemove] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)

    const dispatch = useDispatch();

    const handleClose = () => {
        if (!taskFieldError) {
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

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll='paper'
                aria-labelledby="add-note-title"
                maxWidth="sm"
                fullWidth={1}
            >
                <DialogTitle id="add-note" >
                    {data ? (!remove ? 'Editing note' : 'Want to delete?') : 'Take a note'}
                    <Tooltip title='synchronizing...' placement='bottom'>
                        <span>
                            <SynchronizeLoading />
                        </span>
                    </Tooltip>
                </DialogTitle>
                <DialogContent dividers={1} sx={remove ? { pointerEvents: "none", opacity: 0.8, filter: "blur(1.5px)" } : {}}>
                    <AddTask task={data} />
                </DialogContent>
                <DialogActions >
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
                        Task content should not be empty.
                        Continue editing?
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