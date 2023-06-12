import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, Modal, Stack, Typography } from "@mui/material"
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { useState, useContext } from "react";
import ButtonNext from '@mui/material-next/Button';
import AddTask from "../AddTask/AddTask";
import { DataContext } from "../../context/DataContext";



const ListTitle = () => {
    const { filter } = useContext(DataContext);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const list_name = () => {
        if (filter.list_name === '') {
            return 'All Tasks';
        } else {
            return filter.list_name;
        }
    }

    const AddTaskDialog = () => {
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
                    Take a note
                </DialogTitle>
                <DialogContent dividers={1}>
                    <AddTask />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <Stack direction="column" paddingY={2} paddingLeft={2} display="flex" spacing={1}>
            <Stack direction="row" sx={{ paddingLeft: 2 }}>
                <Typography variant="h4" noWrap={1} sx={{ paddingRight: 5, width: '100%', maxWidth: 800 }}>
                    {list_name()}
                </Typography>
            </Stack>
            <Stack direction="row" >
                <Button>
                    <Avatar>
                        A
                    </Avatar>
                </Button>
                <Button
                    variant="outlined"
                    sx={{ height: 45, width: '100%', maxWidth: 300, color: "dimgrey", borderRadius: 6, alignItems: "baseline", }}
                    style={{ justifyContent: "flex-start", textTransform: 'none' }}
                    onClick={handleOpen}>
                    <Icon sx={{ marginRight: 1 }}>
                        <DriveFileRenameOutlineIcon />
                    </Icon>
                    Take a note...
                </Button>
                <AddTaskDialog />
            </Stack>
        </Stack>
    )
}

export default ListTitle;