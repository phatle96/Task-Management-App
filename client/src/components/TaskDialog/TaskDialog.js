import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import AddTask from "../AddTask/AddTask";


const TaskDialog = ({ data, open, setOpen }) => {

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            scroll='paper'
            aria-labelledby="add-note-title"
            maxWidth="sm"
            fullWidth={1}
        >
            <DialogTitle id="add-note">
                {data ? 'Editing note' : 'Take a note'}
            </DialogTitle>
            <DialogContent dividers={1}>
                <AddTask task={data}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default TaskDialog